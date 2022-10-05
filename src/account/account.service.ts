import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

function hashPassword(password: string, salt: string, rounds = 1000): string {
  return crypto
    .pbkdf2Sync(password, salt, rounds, 64, 'sha512')
    .toString('hex');
}

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(id: string, password: string, name: string) {
    const user = new User();
    user.id = id;
    user.password = hashPassword(password, user.id);
    user.name = name;

    console.log(user.password, user.password.length);

    if (await this.userRepository.findOne({ where: { id: user.id } }))
      return { code: 400, message: '이미 존재하는 아이디입니다.' };
    if (await this.userRepository.findOne({ where: { name: user.name } }))
      return { code: 400, message: '이미 존재하는 이름입니다.' };

    await this.userRepository.save(user);
    return { code: 200, message: '회원가입에 성공했습니다.' };
  }

  async signIn(id: string, password: string) {
    const pwHash = await hashPassword(password, id);
    const user = await this.userRepository.findOne({
      where: { id: id, password: pwHash },
    });
    console.log(id, pwHash);

    if (!user)
      return { code: 400, message: '아이디 또는 비밀번호가 틀렸습니다.' };
    return { code: 200, message: '로그인에 성공했습니다.', data: user };
  }
}
