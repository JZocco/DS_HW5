import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};
const projection = {};
const sort = {
  'user.followers_count': -1
};
const limit = 10;

const client = await MongoClient.connect(
  'mongodb://127.0.0.1:27017/'
);
const coll = client.db('homework5').collection('tweets');
const cursor = coll.find(filter, { projection, sort, limit });
const result = await cursor.toArray();

console.log("Top 10 most followed accounts",)
await client.close();