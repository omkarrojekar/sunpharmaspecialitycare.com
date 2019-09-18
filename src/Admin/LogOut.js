import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

class LogOut extends Component {
    constructor(props)
    {
        super(props)
        localStorage.removeItem("id")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
    }
    render () {
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
    }
}

export default LogOut;