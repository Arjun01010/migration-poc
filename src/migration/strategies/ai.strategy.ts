// migration/strategies/ai.strategy.ts

import { Injectable } from '@nestjs/common';
import {PostgresService} from '../../postgres/postgres.service';
import { AiTransformService } from '../ai/ai-transform.service'

@Injectable()
export class AiStrategy {
  constructor(
    private readonly aiTransform: AiTransformService,
    private readonly sqlService: PostgresService,
  ) {}

  async migrate() {
    const sData = await this.sqlService.getTablesWithData()
    // const sqlData = await this.fetchSqlData(); // your existing GET logic

    return this.aiTransform.transformAndPersist(sData);
  }
}
