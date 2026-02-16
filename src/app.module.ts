import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseConfig } from './config/database.config';
import { MigrationModule } from './migration/migration.module';
import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseConfig,
    MigrationModule,
    MongoModule,
    PostgresModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
