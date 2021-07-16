import React, { useEffect } from "react";
import Table from "../Table/Table"

const TableView = () => {
    const [users, setUsers] = React.useState([])
    const [isLoading, toggleLoading] = React.useReducer(prev => !prev, false)
    const [isError, toggleError] = React.useReducer(prev => !prev, false)

    const URL = "https://jsonplaceholder.typicode.com/users"

    useEffect(() => {
        //api call
        //https://jsonplaceholder.typicode.com/users
        //`${url}&page=${page}`
        const getUsers = async () => {
            toggleLoading()
            await fetch(`${URL}`)
                .then(res => res.json())
                .then(res => {
                    setUsers(res);
                    toggleLoading();
                })
                .catch(() => toggleError())
        }

        getUsers();

    }, [])

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error...</div>

    return (
        <div>
            <Table users={users} />
        </div>
    )
}

export default TableView;