export const sqlToMongoPrompt = (
  tableName: string,
  rows: any[],
) => `
You are a data migration engine.

STRICT RULES:
- Output ONLY valid JSON
- Do NOT explain anything
- Do NOT add markdown
- Do NOT add comments

Task:
Convert SQL table rows into MongoDB documents.

Rules:
- Rename "id" to "_legacyId"
- Keep all other fields unchanged
- Collection name must be "${tableName}"

Input rows:
${JSON.stringify(rows, null, 2)}

Output format:
{
  "collection": "${tableName}",
  "documents": []
}
`;
