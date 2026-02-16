import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../users/users.entity';

@Module({
  imports: [
    // PostgreSQL connection
    TypeOrmModule.forRootAsync({ 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [User],
          synchronize: true,
        };
        console.log('PostgreSQL Config:', {
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.username,
        });
        return config;
      },
    }),

    // MongoDB connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = `${configService.get('MONGO_URI')}/${configService.get('MONGO_DB_NAME')}`;
        console.log('MongoDB URI:', uri);
        return { uri };
      },
    }),
  ],
})
export class DatabaseConfig {}
