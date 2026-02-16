import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { sqlToMongoPrompt } from '../ai/ai-transform.promt'
import {SqlTablePayload} from '../ai/ai-transform.types'
import { MongoService } from 'src/mongo/mongo.service';
import { OllamaService } from './ollama.service';

@Injectable()
export class AiTransformService {
  constructor(
    private readonly mongo: MongoService,
    private readonly ollama: OllamaService,
  ) {}

  async transformAndPersist(tables: SqlTablePayload[]) {
    for (const table of tables) {
      const prompt = sqlToMongoPrompt(table.name, table.data);

      const result = await this.ollama.generate(prompt);

      await this.mongo.insert(
        result.collection,
        result.documents
      );
    }
  }
}
