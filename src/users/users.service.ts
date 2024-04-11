import * as bcrypt from "bcrypt";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/auth/dto/register.dto";
import { Repository } from "typeorm";

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ["favoriteCats"],
    });
  }

  async findProfile(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ["favoriteCats"],
    });

    if (!user) throw new NotFoundException("profile not found");

    delete user.password;
    return user;
  }

  async register(payload: RegisterDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      username: payload.username,
    });
    if (existingUser)
      throw new BadRequestException("username is already taken");

    const password = await bcrypt.hash(payload.password, 0);
    const user = this.usersRepository.create({
      username: payload.username,
      password: password,
      isAdmin: false,
    });

    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }
}
