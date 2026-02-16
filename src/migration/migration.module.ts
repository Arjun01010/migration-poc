import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

import { User } from '../users/users.entity';
import { UserSchema } from '../users/users.schema';
import { COLLECTIONS } from '../shared/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: COLLECTIONS.USERS, schema: UserSchema },
    ]),
  ],
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule {}
