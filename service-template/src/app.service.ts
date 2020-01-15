import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(planDto) {
    return await this.userRepository.create(planDto);
  }
}
