import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from '../shared/entities';
// import {} from './dtos';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // This is a test route for protected routes, it will be removed later
  @Get('test')
  @UseGuards(AuthGuard())
  public async getUserTest(): Promise<string> {
    return 'Success!';
  }
}
