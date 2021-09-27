import React from 'react'
import { useSubscription, gql } from "@apollo/client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (text) => toast(text);

const ADD_TODO_SUB = gql`
    subscription {
        todoAdded {
            id
            title
            status
        }
    }
`;


const Notices = () => {

    let ADD_TODO_SUB_RETURN = useSubscription(ADD_TODO_SUB);
    if (!ADD_TODO_SUB_RETURN.error && !ADD_TODO_SUB_RETURN.loading) {
        notify(ADD_TODO_SUB_RETURN.data.todoAdded.title);
    }


    return <ToastContainer />
}

export default Notices
