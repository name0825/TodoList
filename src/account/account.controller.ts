import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { AccountService } from './account.service';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { Request, Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('signout')
  signout(@Session() session: any) {
    session.destroy();
  }

  @Post('signup')
  async signup(@Body() body: SignUpUserDTO) {
    const { id, password, name } = body;
    return await this.accountService.signUp(id, password, name);
  }

  @Post('signin')
  async signin(@Body() body: SignInUserDTO, @Session() session: any) {
    const { id, password } = body;
    const userData = await this.accountService.signIn(id, password);

    if (userData.code !== 200) return userData;

    session.user = {
      seq: userData.data.seq,
      id: userData.data.id,
      name: userData.data.name,
    };

    return { code: 200, message: '로그인 성공' };
  }
}
