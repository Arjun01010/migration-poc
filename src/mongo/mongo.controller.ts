import { Controller, Get } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Controller('mongo')
export class MongoController {
  constructor(private readonly mongoService: MongoService) {}

  @Get('collections')
  async getCollections() {
    const collections = await this.mongoService.getCollectionsWithData();
    return {
      success: true,
      data: collections,
    };
  }
}
