import React, {useContext} from 'react'
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";


export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} >
                    Main
                </Typography>
                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </Toolbar>
        </AppBar>
        </div>
    )

}