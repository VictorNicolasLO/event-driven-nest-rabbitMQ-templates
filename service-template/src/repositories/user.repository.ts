import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') public readonly planModel: Model<any>) {}

  async create(user) {
    return await this.planModel.create(user);
  }
}
