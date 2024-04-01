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
                    _id: "$user.screen_name",
                    avg: { $avg: "$retweet_count"},
                    tweetCount: {$sum : 1}
                }
            },
            {
                $sort: {
                    avg: -1
                }
            },
            {
                $limit: 10
            }
        ]
        const answer = await collection.aggregate(pipeline).toArray();
        console.log("Top 10 people with the most retweets, after retweeting more than 3 times: ")
        answer.forEach((user, index) => {
            console.log('${index + 1}, ${user._id} with an average retweets of , ${user.avg}');
        });
    } finally {
        await client.close();
    }
}
run().catch(console.dir)