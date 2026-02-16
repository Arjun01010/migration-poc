import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongoController } from './mongo.controller';

@Module({
  controllers: [MongoController],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
 