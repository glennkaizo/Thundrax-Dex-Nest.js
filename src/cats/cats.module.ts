import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cat } from "./cat.entity";
import { User } from "src/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cat, User])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
