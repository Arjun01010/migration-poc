import { Controller, Post, Query } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migrate')
export class MigrationController {
  constructor(
    private readonly migrationService: MigrationService,
  ) {}

  @Post()
  async migrate(
    @Query('mode') mode: 'classic' | 'ai' = 'classic',
  ) {
    return this.migrationService.migrate(mode);
  }
}
