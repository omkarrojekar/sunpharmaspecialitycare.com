import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class UserLogin extends Component {
    state = {
        username: "",
        password: "",
        id: "",
        redirect:false,
        message:'',
        ShowMessage:false,
        usernameErr: '',
        passwordErr: ''
    };
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    validate = () => {
        let usernameErr = "";
        let passwordErr = "";


        if (this.state.username == "") {
            usernameErr = "Please Enter Username !!!";
        }
        if (!this.state.password) {
            passwordErr = "Please Enter Password !!!";
        }

        if (usernameErr || passwordErr) {
            this.setState({ usernameErr });
            this.setState({ passwordErr });
            return false;
        }
        return true;
    }

    user_login = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let data = {
                username: this.state.username,
                password: this.state.password
            };
            const url = 'http://35.154.116.123/sunpharma/register/userlogin';
            const myheader = new Headers();
            myheader.append('Content-Type', 'application/json');
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                myheader
            };

            fetch(url, options)
                .then(res => res.json())
                .then(
                    (result) => {
                        //console.log("RESULT ",result);
                        //alert(this.state.message)
                        if (result.redirect == 1) {
                            localStorage.setItem("userid", result.id)
                            localStorage.setItem("userrole", result.role)
                            localStorage.setItem("username", result.name)
                            this.setState({ redirect: true })
                        }
                        else {
                            this.setState({
                                ShowMessage: true,
                                message: result.text
                            })
                        }
                        //console.log("The State is: ",this.state)
                    },
                    (error) => {
                        this.setState({ error });
                        //console.log(error.message)
                    }
                )
        //console.log(this.state)
        }
    }
    render () {
        if ((localStorage.getItem("userid") != null) && (localStorage.getItem("userrole") == "mr")) 
        {
            window.location.href = window.location.origin.toString() + "/mr/dashboard";
        }
        else
        {
            if(this.state.redirect == true)
            {
                window.location.href = window.location.origin.toString() +"/mr/dashboard";
            }
            else
            {
                return (
                    <React.Fragment>
                        <div className="wrapper-page">
                            <div className="card-box">
                                <div className="panel-heading">
                                    <h4 class="text-center"><strong class="text-custom">Medical Representative</strong> Login</h4>
                                </div>
                                {this.state.ShowMessage == true ? <div><p className="alert alert-danger">{this.state.message}</p></div> : <div></div>}

                                <div className="p-20">
                                    <form class="form-horizontal m-t-20" onSubmit={this.user_login}>

                                        <div className="form-group ">
                                            <div className="col-12">
                                                <input class="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleEvent} />
                                                <div className="text-danger">{this.state.usernameErr}</div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-12">
                                                <input class="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleEvent} />
                                                <div className="text-danger">{this.state.passwordErr}</div>
                                            </div>
                                        </div>

                                        <div className="form-group text-center m-t-40">
                                            <div className="col-12">
                                                <button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit">
                                                    Log In
								</button>
                                            </div>
                                        </div>

                                        <div className="form-group m-t-20 m-b-0">
                                            <div className="col-12">
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <p>
                                        Log In as Admin <a href="/" class="text-primary m-l-5"><b>Admin Login</b></a>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </React.Fragment>
                )
            }
        }
    }
}

export default UserLogin;