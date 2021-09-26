const Query = {

    getTodos:(parent, args, ctx)=>ctx.allTodos,

    getTodo:(parent, {id}, {allTodos})=>{
        let index = allTodos.findIndex((todo) => {
            return todo.id === id
        });
        
        return allTodos[index];
    }
}

module.exports = Query

