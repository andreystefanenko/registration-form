import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import classNames from "classnames";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useAuth} from "../hooks/auth.hook";

const CheckBox = ({isChecked, onClick}) =>
    <p>
        <label>
            <input type="checkbox" onClick={onClick} checked={isChecked}/>
            <span></span>
        </label>
    </p>


export const TablePage = () => {
    const {request} = useHttp()
    const [users, setUsers] = useState([])
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
    const history = useHistory()
    const auth = useContext(AuthContext)

    useEffect(() => request('api/users/all', 'GET')
        .then(data => setUsers(data)), []);

    const onUserSelect = user => {
        const newState = [...users]

        const userToUpdateIndex = newState.indexOf(user)
        newState[userToUpdateIndex].isSelected = !newState[userToUpdateIndex].isSelected

        setUsers(newState);
    }

    const onSelectAll = isChecked => {
        setIsSelectAllChecked(!isChecked)

        const newState = [...users]

        newState.forEach(x => x.isSelected = !isChecked)

        setUsers(newState)
    }

    const onBlockUsersAction = isBlockAction => request('api/users/block', 'POST', {
        userEmails: users.filter(x => x.isSelected).map(x => x.email),
        isBlockAction: isBlockAction
    }).then(data => {

        const blockedUser = data.find(currentUser => currentUser._id === auth.userId)
        if (blockedUser.isBlocked)
        {
            auth.logout()
            history.push('/')
        }
        setUsers(data)
    });

    return (
        <div>
            <h1>Users</h1>
            <a className="waves-effect blue darken-2 btn" onClick={() => onBlockUsersAction(true)}>Block users</a>
            <a className="waves-effect blue darken-2 btn" onClick={() => onBlockUsersAction(false)}> Unblock users</a>
            <table>
                <thead>
                <tr>
                    <th><CheckBox onClick={() => onSelectAll(isSelectAllChecked)} checked={isSelectAllChecked}/></th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Last Online</th>
                    <th>Is Blocked</th>
                </tr>
                </thead>
                <tbody>
                {users.map(x => <tr onClick={() => onUserSelect(x)} className={classNames({
                    'selected-row': x.isSelected
                })} key={x._id}>
                    <th></th>
                    <th>{x._id}</th>
                    <th>{x.email}</th>
                    <th>{x.regDate}</th>
                    <th>{x.lastLogin}</th>
                    <th>{x.isBlocked? "yes" : "no" }</th>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}