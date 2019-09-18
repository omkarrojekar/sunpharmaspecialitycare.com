import React, { Component } from 'react';
import Header from '../Mr/Layout/MrHeader';
import Leftbar from '../Mr/Layout/MrLeftBar';
import Footer from '../layout/Footer';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class ChangePassword extends Component {
    state = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        message: "",
        message: '',
        ShowMessage: false,
        oldPasswordErr: '',
        newPasswordErr: '',
        confirmPasswordErr: ''
    };
      handleEvent = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () =>{
        let oldPasswordErr = '';
        let newPasswordErr = '';
        let confirmPasswordErr = '';

        if (this.state.oldPassword == "") {
            oldPasswordErr = "Please Enter Old Password !!!";
        }
        if (this.state.newPassword == "") {
            newPasswordErr = "Please Enter New Password !!!";
        }
        if (this.state.confirmPassword == "") {
            confirmPasswordErr = "Please Enter Confirm Password !!!";
        }
        if (oldPasswordErr || newPasswordErr || confirmPasswordErr) {
            this.setState({ oldPasswordErr });
            this.setState({ newPasswordErr });
            this.setState({ confirmPasswordErr });
            return false;
        }
        return true;

    }
    resetForm = () => {
        this.setState({ oldPassword: "", newPassword: "", confirmPassword: "" })
    }
    change_password = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let data = {
                userId:localStorage.getItem("userid"),
                oldPassword:this.state.oldPassword,
                newPassword:this.state.newPassword,
                confirmPassword:this.state.confirmPassword,
            };
            //console.log(data)
            const url = 'http://35.154.116.123/sunpharma/register/changepassword';
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
                        //alert(result);
                        //alert(this.state.message)
                        console.log(result)
                        this.setState({
                            ShowMessage: true,
                            message: result
                        })
                    },
                    (error) => {
                        this.setState({ error });
                        console.log(error.message)
                    }
                )
        }
        this.resetForm();
    }

    render() {
        if (localStorage.getItem("userid") != null) {
            return (
                <React.Fragment>
                     <div id="wrapper" class="enlarged forced">
                        <Header />
                        <div className="left side-menu">
                            <Leftbar />
                        </div>

                        <div className="content-page">
                            <div className="content">
                                <div className="row">
                                    <div className="col-sm-12">

                                        <h4 className="page-title">Welcome {localStorage.getItem("username")}</h4>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Medical Reprensentative</a></li>
                                            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Change Password</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <div className="card-box">
                                      
                                        <h2 className="text-center text-success">Change Password</h2>
                                        <hr />
                                        {this.state.ShowMessage == true ? <div><p className="alert alert-success">{this.state.message}</p></div> : <div></div>}
                                        <form onSubmit={this.change_password}>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><label for="name">Old Password:</label></strong>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" id="oldPassword" name="oldPassword" className="form-control" value={this.state.oldPassword} onChange={this.handleEvent} placeholder="Old Password" />
                                                    <div className="text-danger">{this.state.oldPasswordErr}</div>
                                                    
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <strong>New Password:</strong>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" id="newPassword" name="newPassword" className="form-control" value={this.state.newPassword} onChange={this.handleEvent} placeholder="New Password" />
                                                    <div className="text-danger">{this.state.newPasswordErr}</div>
                                                    
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <strong>Confirm Password:</strong>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" value={this.state.confirmPassword} onChange={this.handleEvent} placeholder="Confirm Password" />
                                                    <div className="text-danger">{this.state.confirmPasswordErr}</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mt-2">
                                                <div className="col-md-8">
                                                    <input type="submit" className="btn btn-success" value="Change Password" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                   
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Redirect to="/user/login" />
                </React.Fragment>
            )
        }
    }
}

export default ChangePassword;