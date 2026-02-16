import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      message: '🚀 Migration service is running',
      status: 'ok',
    };
  }
}
