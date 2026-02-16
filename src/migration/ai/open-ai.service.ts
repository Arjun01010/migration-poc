import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async execute(prompt: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0,
      messages: [{ role: 'user', content: prompt }],
    });

    return JSON.parse(response.choices[0].message.content ?? '{}');
  }
}
