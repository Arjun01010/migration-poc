import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

import { User } from '../users/users.entity';
import { UserSchema } from '../users/users.schema';
import { COLLECTIONS } from '../shared/constants';
import { AiStrategy } from './strategies/ai.strategy';
import { ConventionalStrategy } from './strategies/conventional.strategy';
import { AiTransformService } from './ai/ai-transform.service';
import { PostgresService } from 'src/postgres/postgres.service';
import { MongoService } from 'src/mongo/mongo.service';
import { OpenAiService } from './ai/open-ai.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    MongooseModule.forFeature([
      { name: COLLECTIONS.USERS, schema: UserSchema },
    ]),
  ],
  controllers: [MigrationController],  
  providers: [
    MigrationService,
    AiStrategy,
    ConventionalStrategy,
    AiTransformService,
    PostgresService,
    MongoService,
    OpenAiService
  ],
})
export class MigrationModule {}
