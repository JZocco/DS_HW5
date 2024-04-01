import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  'retweeted_status': false
  
};

const client = await MongoClient.connect(
  'mongodb://127.0.0.1:27017/'
);

const coll = client.db('homework5').collection('tweets');
const cursor = coll.find(filter);
const result = await cursor.toArray();
console.log("I've found ", result.count(), "tweets")
await client.close();