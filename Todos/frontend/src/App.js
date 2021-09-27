import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription, gql } from "@apollo/client";
import { Heading, Input, Button, Container, Flex, Radio, Label } from "theme-ui";

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const notify = (text) => toast(text);


import Notices from "./Notices";

const GET_TODOS = gql`
  {
    getTodos {
      id
      title
      status
    }
  }
`;
const ADD_TODO = gql`
  mutation ($title: String!, $status: Boolean!) {
    addTodo(title: $title, status: $status) {
      title
    }
  }
`;
// const ADD_TODO_SUB = gql`
// subscription {
//   todoAdded {
//     id
//     title
//     status
//   }
// }
// `;

const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      status
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!) {
    updateTodo(id: $id) {
      id
    }
  }
`;




export default function Home() {
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [addTodo, addTodoReturnObj] = useMutation(ADD_TODO);

  // console.log(addTodoReturnObj.error)
  
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(true);
  
  // let ADD_TODO_SUB_RETURN = useSubscription(ADD_TODO_SUB);
  // // console.log(ADD_TODO_SUB_RETURN);
  // if (!ADD_TODO_SUB_RETURN.error && !ADD_TODO_SUB_RETURN.loading) {
  //   notify(ADD_TODO_SUB_RETURN.data.todoAdded.title);
  //   ADD_TODO_SUB_RETURN.error = true;
  // }
  
  const addTask = async () => {
    // let dat = 
    await addTodo({
      variables: {
        title,
        status
      },
      refetchQueries: [{ query: GET_TODOS }],
    })
    // console.log(dat)
    
    setTitle('');
    setStatus(false);
  };

  const deleteTask = async (id) => {
    // let res2 = 
    await deleteTodo({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
    // console.log(res2)
  };

  const updateTask = async (id) => {
    await updateTodo({
      variables: {
        id
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <h2>Loading..</h2>;


  if (error) {
    console.log(error);
    return <h2>Error</h2>;
  }

  return (
    <Container p={3} className="container">

      <Notices />

      <Flex
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading p={2} as="h1">
          Add Task
        </Heading>
        <Input
          sx={{ width: "30%", minWidth: "250px" }}
          m={2}
          type="text"
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
          value={title}
        />
        <Label>
          <Radio
            name='dark-mode'
            value='true'
            defaultChecked={true}
            onClick={()=>{
              setStatus(true)
            }}
          />
          Completed
        </Label>
        <Label>
          <Radio
            name='dark-mode'
            value='false'
            onClick={()=>{
              setStatus(false)
            }}
          />
          Not Completed
        </Label>

        <Button m={2} variant="primary" backgroundColor="#5b29e2" onClick={addTask}>
          Add Task
        </Button>
      </Flex>


      <Flex sx={{ flexDirection: "column" }}>
        <Heading sx={{ margin: "20px auto" }} as="h1" p={2}>
          MY TODO LIST
        </Heading>

        <Flex
          sx={{
            margin: "10px 0",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {data.getTodos.map((todo) => {
            return (
              <Flex key={todo.id}
                style={{
                  flexWrap: "wrap",
                  fontSize: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    width: "50%",
                    minWidth: "200px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ margin: "10px", backgroundColor:"#03a9f4",padding:"10px", borderRadius:"5px" }} >{todo.title}</span>
                  
                </div>
                <div>

                  <Button sx={{ margin: "5px" }} backgroundColor={todo.status.toString()==="true"?"green":"blue"}>
                      {todo.status.toString()==="true"?"Task Completed":"Ongoing"}
                  </Button>

                  {!todo.status?<Button onClick={() => {updateTask(todo.id)}} backgroundColor="purple">Update</Button>:<Button backgroundColor="purple" onClick={(e) => {e.preventDefault();updateTask(todo.id)}}>Undo</Button>}

                  <Button sx={{ margin: "5px" }} backgroundColor="red" onClick={() => {deleteTask(todo.id)}}>
                    Delete
                  </Button>
                  
                </div>
              </Flex>
            );
          })}

        </Flex>
      </Flex>
    </Container>
  );
}
