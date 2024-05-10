import { MongoClient } from 'mongodb';
import Constants from './constants.js';

class Database {
  _instance = null;

  init = async (config) => {
    const client = new MongoClient(config.url, {
      minPoolSize: config.minPoolSize,
      maxPoolSize: config.maxPoolSize,
    });
    try {
      await client.connect();
      console.log('mongodb connected');
    } catch (err) {
      console.error(`Error connecting to mongoDB. Error: ${err}`);
    }
    this._instance = client.db(config.database);
  };

  getDb = () => {
    return this._instance;
  };

  dbUsers = () => {
    return this._instance.collection(Constants.USERS_COLLECTION);
  };

  dbRepairs = () => {
    return this._instance.collection(Constants.REPAIRS_COLLECTION);
  };

  dbCollectors = () => {
    return this._instance.collection(Constants.COLLECTORS_COLLECTION);
  };
}

export const db = new Database();
