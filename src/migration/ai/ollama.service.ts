import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OllamaService {
  private readonly baseUrl = 'http://localhost:11434';

  async generate(prompt: string): Promise<any> {
    let res: Response;

    try {
      res = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt,
          stream: false,
          options: {
            temperature: 0,
          },
        }),
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed to connect to Ollama. Is ollama serve running?',
      );
    }

    const data = await res.json();

    if (!data || typeof data.response !== 'string') {
      console.error('Ollama raw response:', data);
      throw new InternalServerErrorException(
        'Ollama returned an invalid response',
      );
    }

    return this.safeJsonParse(data.response);
  }

  private safeJsonParse(text: string) {
    try {
      return JSON.parse(text);
    } catch {
      // Attempt recovery: extract JSON block
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error('Non-JSON Ollama output:', text);
        throw new InternalServerErrorException(
          'LLM output was not valid JSON',
        );
      }
      return JSON.parse(match[0]);
    }
  }
}
