import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsAlphanumeric()
  readonly username: string;

  @IsString()
  @MinLength(2)
  readonly password: string;
}
