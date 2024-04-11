import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { IsAdminGuard } from "src/auth/guards/is-admin.guard";
import { Cat } from "./cat.entity";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { ISessionUser } from "src/auth/interfaces/session-user.interface";

@UseGuards(JwtAuthGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() payload: CreateCatDto): Promise<Cat> {
    return this.catsService.create(payload);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":uuid")
  findOne(
    @Param("uuid", ParseUUIDPipe)
    uuid: string,
  ): Promise<Cat> {
    return this.catsService.findByUuid(uuid);
  }

  @UseGuards(IsAdminGuard)
  @Put(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: string,
    @Body() payload: UpdateCatDto,
  ): Promise<any> {
    return this.catsService.update(uuid, payload);
  }

  @UseGuards(IsAdminGuard)
  @Delete(":uuid")
  delete(@Param("uuid", ParseUUIDPipe) uuid: string): Promise<boolean> {
    return this.catsService.delete(uuid);
  }

  @Post("add-favorite/:uuid")
  addFavorite(
    @Param("uuid", ParseUUIDPipe) uuid: string,
    @Request() req: { user: ISessionUser },
  ) {
    return this.catsService.addFavorite(uuid, req.user.uuid);
  }

  @Post("remove-favorite/:uuid")
  removeFavorite(
    @Param("uuid", ParseUUIDPipe) uuid: string,
    @Request() req: { user: ISessionUser },
  ) {
    return this.catsService.removeFavorite(uuid, req.user.uuid);
  }
}
