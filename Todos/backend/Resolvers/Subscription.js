const { ADDED, UPDATED, DELETED } = require("../subscriptionConts");


const Subscription = {
    todoAdded: {
        subscribe: (parent, args, {pubsub})=>{
            const asyncIterator = pubsub.asyncIterator(ADDED);
            return asyncIterator
        }
    },
    todoUpdated: {
        subscribe: (parent, args, {pubsub})=>{
            const asyncIterator = pubsub.asyncIterator(UPDATED)
            return asyncIterator
        }
    },
    todoDeleted: {
        subscribe: (parent, args, {pubsub})=>{
            const asyncIterator = pubsub.asyncIterator(DELETED)
            return asyncIterator
        }
    }
}

module.exports = Subscription
