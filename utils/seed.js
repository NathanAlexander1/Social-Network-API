const connection = require('../config/connection');

const { User, Thought } = require('../models');

const { Schema, Types, model } = require("mongoose");

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
    {
        username: 'Erik',
        email: 'erik@erik.com'
    },
    {
        username: 'Jordan',
        email: 'jordan@jordan.com'
    },
    {
        username: 'Steve',
        email: 'steve@steve.com'
    },
]

const thoughtData = [
    {
        thoughtText: 'I think the sky is blue',
        username: 'User1',
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
    {
        thoughtText: 'The ocean is so big',
        username: 'User5'
    },
    {
        thoughtText: 'There are probably over 400 grains of sand',
        username: 'User6'
    },
    {
        thoughtText: 'Birds are just government drones',
        username: 'User7'
    },
]

const reactionData = [
    {
        reactionBody: 'Wow that is crazy',
        username: 'Thompson',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'Holy moly!',
        username: 'Jackson',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'Yowzaaa',
        username: 'Marcus',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'I totally agree',
        username: 'Jacob',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'Pshh get outta here!!',
        username: 'Marshall',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'Only crazy people think thatr!',
        username: 'Danielle',
        reactionId: new Types.ObjectId()
    },
    {
        reactionBody: 'That is a very astute observation',
        username: 'Joshua',
        reactionId: new Types.ObjectId()
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