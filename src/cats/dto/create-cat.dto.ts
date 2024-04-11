import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateCatDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(50)
  readonly age: number;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly breed: string;
}
