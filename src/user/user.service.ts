import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../shared/entities';
// import {} from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
}
