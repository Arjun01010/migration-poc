import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { sqlToMongoPrompt } from '../ai/ai-transform.promt'
import { OpenAiService } from '../ai/open-ai.service';
import {SqlTablePayload} from '../ai/ai-transform.types'
import { MongoService } from 'src/mongo/mongo.service';

@Injectable()
export class AiTransformService {
  constructor(
    private readonly openAi: OpenAiService,
    private readonly mongo: MongoService,
  ) {}

  async transformAndPersist(tables: SqlTablePayload[]) {
    for (const table of tables) {
      const prompt = sqlToMongoPrompt(table.name, table.data);

      const result = await this.openAi.execute(prompt);

      await this.mongo.insert(
        result.collection,
        result.documents
      );
    }
  }
}
