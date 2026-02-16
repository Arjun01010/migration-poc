import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { CreateUserDto } from './create-user.dto';

@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Get('tables')
  async getTables() {
    const tables = await this.postgresService.getTablesWithData();
    return {
      success: true,
      data: tables,
    };
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.postgresService.createUser(createUserDto);
  }
}
