import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthType } from '../shared/enums';
import { User } from '../shared/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // TODO: Consider what would fit better in the user module
  async findUser(type: AuthType, id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { authType: type, authId: id },
    });

    return user;
  }

  async createUser(
    authType: AuthType,
    authId: string,
    email: string,
    username?: string,
  ): Promise<User> {
    return this.userRepo
      .create({
        email,
        username,
        authType,
        authId,
      })
      .save();
  }
}
