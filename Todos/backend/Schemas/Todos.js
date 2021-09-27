const { gql } = require('apollo-server');

const todos = gql`
    type Todo {
        id: ID!
        title: String!
        status: Boolean!
    }

    type Query {
        getTodos:[Todo!]!
        getTodo(id: ID!):Todo!
    }

    type Mutation {
        addTodo(title: String!, status: Boolean!):Todo
        updateTodo(id: ID!):Todo
        deleteTodo(id: ID!):Todo
    }

    type Subscription {
        todoAdded: Todo
        todoUpdated: Todo
        todoDeleted: Todo
    }
`;



// # type Subscription {
//     #     todoInfo: Todo!
//     # }

module.exports = todos