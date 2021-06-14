import React, {useContext} from 'react'
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue">
                <span className="brand-logo">Main page</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )

}