export const sqlToMongoPrompt = (
    tableName: string,
    rows: any[]
  ) => `
  You are a database migration engine.
  
  Convert SQL table rows into MongoDB documents.
  
  Rules:
  - Rename "id" to "_legacyId"
  - Keep field names as-is
  - Output only valid JSON
  
  Input:
  Table: ${tableName}
  Rows:
  ${JSON.stringify(rows, null, 2)}
  
  Output:
  {
    "collection": "${tableName}",
    "documents": []
  }
  `;
  