import { MongoClient } from 'mongodb';
import Constants from './constants.js';

class Database {
  _instance = null;

  // config has all DB settings
  // TODO: Add connection pool
  init = async (config) => {
    const client = new MongoClient(config.url, {
      minPoolSize: config.minPoolSize,
      maxPoolSize: config.maxPoolSize,
    });
    await client.connect();
    // eslint-disable-next-line no-underscore-dangle
    this._instance = client.db(config.database);
  };

  getDb = () => {
    return this._instance;
  };

  dbRepairs = () => {
    return this._instance.collection(Constants.REPAIRS_COLLECTION);
  };

  dbCollectors = () => {
    return this._instance.collection(Constants.COLLECTORS_COLLECTION);
  };
}

export const db = new Database();
