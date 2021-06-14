import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className= "col s5 offset-s3">
                <h4 className="center-align">Sign in</h4>
                <div className="card white">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>

                            <div className="input-field ">
                                <input id="email"
                                       type="email"
                                       name="email"
                                       className="validate"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="Incorrect email"/>
                            </div>

                            <div className="input-field">
                                <input id="password"
                                       type="password"
                                       name="password"
                                       className="orange-input"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action ">
                        <button
                            className="waves-effect waves-light btn blue darken-4"
                            onClick={loginHandler}
                            disabled={loading}>
                            Sign in
                        </button>

                        <button
                            className="waves-effect waves-light btn blue darken-4 right"
                            onClick={registerHandler}
                            disabled={loading}>
                            Sign up
                        </button>

                        <label className="black-text right col s4 textCardMargin right-align">No account? Create one! </label>
                    </div>
                </div>
            </div>
        </div>
    )
}