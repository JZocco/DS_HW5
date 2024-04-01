const {MongoClient} = require('mongodb')
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try{

        await client.connect();
        const collection = client.db('homework5').collection('tweets');
        const pipeline = [
            {
                $group: {
                    _id : "$user.screen_name",
                    tweetCount: {$sum : 1}
                }
            },
            { $sort: { tweetCount: -1}  },
            { $limit: 1}
        ];
        const answer = await collection.aggregate(pipeline).toArray();
        console.log("The person with the most tweets is ", $answer._id, " who tweeted ", $answer.tweetCount, " times")

    } finally {
        await client.close();
    }
}
run().catch(console.dir)