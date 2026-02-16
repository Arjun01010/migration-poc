import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class PostgresService {
  constructor(private dataSource: DataSource) {}

  async getTablesWithData() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // Get all table names
      const tables = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);

      const result: { name: string; rowCount: number; data: any[] }[] = [];

      for (const table of tables) {
        const tableName = table.table_name;
        
        // Get row count
        const countResult = await queryRunner.query(
          `SELECT COUNT(*) as count FROM "${tableName}"`,
        );
        const rowCount = parseInt(countResult[0].count, 10);

        // Get table data
        const data = await queryRunner.query(`SELECT * FROM "${tableName}"`);

        result.push({
          name: tableName,
          rowCount: rowCount,
          data: data,
        });
      }

      return result;
    } finally {
      await queryRunner.release();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await queryRunner.query(
        `INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *`,
        [createUserDto.name, createUserDto.email, createUserDto.phone],
      );

      return {
        success: true,
        message: 'User created successfully',
        data: result[0],
      };
    } finally {
      await queryRunner.release();
    }
  }
}
