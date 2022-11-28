const connection = require('../config/connection');

const { User, Thought } = require('../models');

const userData = [
    {
        username: 'Josh',
        email: 'josh@josh.com'
    },
    {
        username: 'Mark',
        email: 'mark@mark.com'
    },
    {
        username: 'Tim',
        email: 'tim@tim.com'
    },
    {
        username: 'Jan',
        email: 'jan@jan.com'
    },
]

const thoughtData = [
    {
        thoughtText: 'I think the sky is blue',
        username: 'User1'
    },
    {
        thoughtText: 'I think thoughts are cool',
        username: 'User2'
    },
    {
        thoughtText: 'The universe is crazy',
        username: 'User3'
    },
    {
        thoughtText: 'I think aliens are real',
        username: 'User4'
    },
]

const reactionData = [
    {
        reactionBody: 'Wow that is crazy',
        username: 'Thompson'
    },
    {
        reactionBody: 'Holy moly!',
        username: 'Jackson'
    },
    {
        reactionBody: 'Yowzaaa',
        username: 'Marcus'
    },
    {
        reactionBody: 'I totally agree',
        username: 'Jacob'
    },
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];



const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(getRandomArrItem(reactionData));
    }
    return results;
};

connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    await Thought.deleteMany({})

    const thoughts = []

    thoughtData.forEach(thought => {
        const reactions = getRandomReactions(3);
        thought.reactions = reactions;
        thoughts.push(thought)
    })

    await Thought.collection.insertMany(thoughts)

    await User.collection.insertOne({
        username: 'nathanAlexander',
        thoughts: [...thoughts.map(thought => thought._id)]
    })

    // Log out the seed data to indicate what should appear in the database
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});