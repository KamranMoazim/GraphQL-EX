const { v4 } = require("uuid")

const { ADDED, DELETED, UPDATED } = require("../subscriptionConts");

const Mutation = {
    addTodo:(parent, {title, status}, {allTodos, pubsub})=>{

        console.log(title, status)

        let todoAdded = {id:v4(), title, status};
        // allTodos.push(todoAdded);

        pubsub.publish(ADDED, {
            todoAdded
        });
        // console.log("CALLED CALLED")
        return todoAdded;
    },
    updateTodo:(parent, {id}, {allTodos, pubsub})=>{

        let index = allTodos.findIndex((todo) => {
            return todo.id === id
        });
        allTodos[index].status = !allTodos[index].status;

        let todoUpdated = allTodos[index]

        pubsub.publish(UPDATED, {
            todoUpdated
        });

        return todoUpdated
    },
    deleteTodo:(parent, {id}, {allTodos, pubsub})=>{

        let index = allTodos.findIndex((todo) => {
            return todo.id === id
        });
        let todoDeleted = allTodos[index];
        pubsub.publish(DELETED, {
            todoDeleted
        });
        allTodos.splice(index, 1);
        return todoDeleted

    }
}

module.exports = Mutation
