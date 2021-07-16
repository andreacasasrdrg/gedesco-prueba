import React from "react";
import { SORT } from "../constants"

const Users = React.memo(({ users }) => (
    users.map(u => (
        <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
        </tr>
    ))
))

const Table = ({ users }) => {
    const [sortId, setSortId] = React.useState(SORT.DISABLED);
    const [sortName, setSortName] = React.useState(SORT.DISABLED);
    const [sortUsername, setSortUsername] = React.useState(SORT.DISABLED);
    const [sortEmail, setSortEmail] = React.useState(SORT.DISABLED);
    const [usersToSort, setusersToSort] = React.useState(users)

    const displaySorting = React.useCallback(elem => {
        switch(elem){
            case SORT.UP: return "up"
            case SORT.DOWN: return "down"
            default:
        }
    }, [])

    const sortByType = React.useCallback((elem, target, stateFn) => {
        if (elem === SORT.DISABLED) {
            setusersToSort([...usersToSort.sort((a, b) => (a[target] > b[target]) ? 1 : -1)]);
            return stateFn(SORT.UP)
        }
        if (elem === SORT.UP) {
            setusersToSort([...usersToSort.sort((a, b) => (a[target] > b[target]) ? -1 : 1)]);
            return stateFn(SORT.DOWN)
        }
        if (elem === SORT.DOWN) {
            setusersToSort([...usersToSort.sort((a, b) => (a[target] > b[target]) ? 1 : -1)]);
            return stateFn(SORT.UP)
        }
    }, [usersToSort])

    //sort columns
    const sortUsers = React.useCallback(e => {
        switch (e.target.id) {
            case SORT.ID: return sortByType(sortId, e.target.id, setSortId)
            case SORT.NAME: return sortByType(sortName, e.target.id, setSortName)
            case SORT.USERNAME: return sortByType(sortUsername, e.target.id, setSortUsername)
            case SORT.EMAIL: return sortByType(sortEmail, e.target.id, setSortEmail)
            default:
        }
    }, [sortByType, sortEmail, sortId, sortName, sortUsername])

    return (
        <table>
            <thead>
                {/* id, name, username, email */}
                <th onClick={sortUsers} id="id">Id {displaySorting(sortId)}</th>
                <th onClick={sortUsers} id="name">Name {displaySorting(sortName)}</th>
                <th onClick={sortUsers} id="username">Username {displaySorting(sortUsername)}</th>
                <th onClick={sortUsers} id="email">Email {displaySorting(sortEmail)}</th>
            </thead>
            <tbody>
                <Users users={usersToSort} />
            </tbody>
        </table>
    )
}

export default Table;