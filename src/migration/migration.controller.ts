import { Controller, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

@Controller('migrate')
// export class MigrationController {
//   constructor(private readonly migrationService: MigrationService) {}

//   @Post('users') 
//   async migrateUsers() {
//     return this.migrationService.migrateUsers();
//   }
// }

// migration.controller.ts
export class MigrationController {
constructor(private readonly migrationService: MigrationService) {}
async migrate(
  @Query('mode') mode: 'classic' | 'ai' = 'classic'
) {
  return this.migrationService.migrate('classic');
}
}
function Query(param: string) {
  return createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query[param];
  })(param);
}

