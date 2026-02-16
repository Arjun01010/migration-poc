import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    this.client = new MongoClient(mongoUri);
    await this.client.connect();
    this.db = this.client.db(process.env.MONGO_DB_NAME);
  }

  async getCollectionsWithData() {
    const collections = await this.db.listCollections().toArray();
    const result: { name: string; documentCount: number; data: any[] }[] = [];

    for (const collection of collections) {
      const collectionName = collection.name;
      const data = await this.db.collection(collectionName).find({}).toArray();
      result.push({
        name: collectionName,
        documentCount: data.length,
        data: data,
      });
    }

    return result;
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
