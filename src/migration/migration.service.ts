import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';

import { Repository } from 'typeorm';
import { Model } from 'mongoose';

import { User } from '../users/users.entity';
import { COLLECTIONS } from '../shared/constants';
import { ConventionalStrategy } from './strategies/conventional.strategy';
import { AiStrategy } from './strategies/ai.strategy';

@Injectable()
// export class MigrationService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,

//     @InjectModel(COLLECTIONS.USERS)
//     private readonly mongoUserModel: Model<any>,
//   ) {}

//   async migrateUsers() {
//     // 1. Read from SQL
//     const sqlUsers = await this.userRepository.find();

//     if (!sqlUsers.length) {
//       return { migrated: 0, message: 'No users found in SQL DB' };
//     }

//     // 2. Transform
//     const mongoDocs = sqlUsers.map((user) => ({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       sqlUserId: user.id,
//     }));

//     // 3. Write to MongoDB
//     await this.mongoUserModel.insertMany(mongoDocs);

//     return {
//       migrated: mongoDocs.length,
//       status: 'SUCCESS',
//     };
//   }
// }

// migration.service.ts
@Injectable()
export class MigrationService {
  constructor(
    private readonly conventional: ConventionalStrategy,
    private readonly ai: AiStrategy,
  ) {}

  async migrate(mode: 'classic' | 'ai') {
    if (mode === 'ai') {
      return this.ai.migrate();
    }
    return this.conventional.migrateUsers();
  }
}

