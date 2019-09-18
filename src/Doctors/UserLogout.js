import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

class UserLogout extends Component {
    constructor(props) {
        super(props)
        localStorage.removeItem("userid")
        localStorage.removeItem("userrole")
        localStorage.removeItem("username")
    }
    render() {
        return (
            <div>
                <Redirect to="/user/login" />
            </div>
        )
    }
}

export default UserLogout;