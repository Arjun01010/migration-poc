export interface SqlTablePayload {
    name: string;
    rowCount: number;
    data: Record<string, any>[];
  }
  