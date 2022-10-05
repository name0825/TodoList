import { PartialType } from '@nestjs/mapped-types';
import { SignInUserDTO } from './signin-user.dto';
import { IsString } from 'class-validator';

export class SignUpUserDTO extends PartialType(SignInUserDTO) {
  @IsString()
  name: string;
}
