import { Controller, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migrate')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('users') 
  async migrateUsers() {
    return this.migrationService.migrateUsers();
  }
}
