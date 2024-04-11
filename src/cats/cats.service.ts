import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(payload: CreateCatDto): Promise<Cat> {
    return this.catsRepository.save(payload);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findByUuid(uuid: string): Promise<Cat | null> {
    return this.catsRepository.findOneBy({ uuid });
  }

  async update(uuid: string, payload: UpdateCatDto): Promise<Cat | null> {
    const result = await this.catsRepository.update({ uuid }, payload);
    return result.affected ? this.findByUuid(uuid) : null;
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.catsRepository.delete({ uuid });
    return result.affected > 0;
  }

  async addFavorite(catUuid: string, userUuid: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { uuid: userUuid },
      relations: ["favoriteCats"],
    });
    if (!user || user.favoriteCats.some(cat => cat.uuid === catUuid)) {
      return false;
    }

    const cat = await this.findByUuid(catUuid);
    if (!cat) {
      return false;
    }

    user.favoriteCats.push(cat);
    await this.usersRepository.save(user);
    return true;
  }

  async removeFavorite(catUuid: string, userUuid: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { uuid: userUuid },
      relations: ["favoriteCats"],
    });

    if (!user || !user.favoriteCats.some(cat => cat.uuid === catUuid)) {
      return false;
    }

    user.favoriteCats = user.favoriteCats.filter(cat => cat.uuid !== catUuid);
    await this.usersRepository.save(user);
    return true;
  }
}
