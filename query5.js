const {MongoClient} = require('mongodb')
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function makeUserCollection() {
    try{
        await client.connect();
        const collection = client.db('homework5').collection('tweets');
        const pipeline = [
            {
                $group: {
                    _id : "$user.screen_name",
                    user : {$first : "$user"}
                }
            },
            { $replaceRoot : { newRoot: "$user"} }
        ];
        
        const users = await collection.aggregate(pipeline).toArray();
        const usersColleciton = client.db('homework5').collection('Users');
        await usersColleciton.insertMany(users);

        console.log('Added ${users.length} unique users into the Users collection.');

    } finally {
        await client.close();
    }
}

makeUserCollection().catch(console.dir);

async function tweetCollection() {
    try{
        await client.connect();
        const collection = client.db('homework5').collection('tweets');
        
        const totalTweets = await tweets.find({}).toArray();
        const tweetData = totalTweets.map(tweets => {
            const { user, ...tweetData} = tweet;
            return {
                ...tweetData,
                userId: user.id_str
            };
        });

    const tweetsOnlyCollection = database.collection ("OnlyTweets")
    await tweetsOnlyCollection.insertMany(tweetData);

    console.log('Added ${tweetData.length} unique tweets into OnlyTweets.');
    } finally {
        await client.close();
    }
}
run().catch(console.dir)