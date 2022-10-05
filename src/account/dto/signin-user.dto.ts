import { IsString } from 'class-validator';

export class SignInUserDTO {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
