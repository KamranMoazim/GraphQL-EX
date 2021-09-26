const { ApolloServer ,PubSub } = require('apollo-server');
// const PubSub = 'graphql-subscriptions';

let {allTodos} = require('./DB')
const typeDefs = require('./Schemas/Todos')
const Query = require("./Resolvers/Query")
const Mutation = require("./Resolvers/Mutation")
const Subscription = require("./Resolvers/Subscription")


const pubsub = new PubSub();


const server = new ApolloServer({ 
    typeDefs, 
    resolvers: {
      Query,
      Mutation,
      Subscription
    },
    context: {
        allTodos, 
        pubsub
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



