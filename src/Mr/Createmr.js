import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
 class Createmr extends Component {
    state = {
        name: "",
        email: "",
        contact: "",
        designation:"",
        location:"",
        nameerr: "",
        emailerr: "",
        contacterr: "",
        designationErr:"",
        locationErr:"",
        message: "",
        username:"",
        message: '',
        ShowMessage: false,
    };
    handleEvent = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    resetform = () => {
        this.setState({name:"",email:"",contact:""})
    }

    validate = () => {
        let emailerr = "";
        let nameerr = ""; 
        let contacterr = "";
        let designationErr = "";
        let locationErr="";


        if(! this.state.email.includes("@"))
        {
            emailerr="The Email you entered is not valid !!!";
        }
        if(! this.state.name)
        {
            nameerr = "Name field Should not be Empty !!!";
        }

        if (!this.state.contact) {
            contacterr = "Contact field Should not be Empty !!!";
        }
        if (!this.state.designation) {
            designationErr = "Designation field Should not be Empty !!!";
        }
        if (!this.state.location) {
            locationErr = "Contact field Should not be Empty !!!";
        }
        if (emailerr || nameerr || contacterr ||  designationErr || locationErr) 
        {
            this.setState({emailerr});
            this.setState({ nameerr });
            this.setState({ contacterr });
            this.setState({designationErr});
            this.setState({locationErr});
            return false;
        }
        return true;
    }

    save_details = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid)
        {
            let data = {
                name : this.state.name,
                email : this.state.email,
                contact : this.state.contact,
                designation : this.state.designation,
                location : this.state.location,
                username: this.state.username
            };
            const url = 'http://35.154.116.123/sunpharma/register/addmr';
            const myheader = new Headers();
            myheader.append('Content-Type','application/json');
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                myheader
            };

            fetch(url,options)
            .then(res => res.json())
            .then(
                (result) => {
                    //alert(result);
                    //alert(this.state.message)
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
    }
    render() {
        if(localStorage.getItem("id") != null)
        {

        
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

                                <h4 className="page-title">Welcome Admin</h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Admin</a></li>
                                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li className="breadcrumb-item active">MR</li>
                                        <li className="breadcrumb-item active">Create Medical Representative</li>
                                </ol>

                            </div>
                        </div>
                            <div className="container mt-5">
                        <div className="text-danger text-success">{this.state.message}</div>
                        <div className="card-box">
                                    <h2 className="text-center text-success">New Medical Representative</h2>
                                    <hr />
                                {this.state.ShowMessage == true ? <div><p className="alert alert-success">{this.state.message}</p></div> : <div></div>}
                            <form onSubmit={this.save_details}>
                                <div className="row">
                                    <div className="col-md-2">
                                                <strong><label for="name">Name:</label></strong>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleEvent} placeholder="Full Name" />
                                        <div className="text-danger">{this.state.nameerr}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-2">
                                        <strong><label for="email"> Email: </label></strong>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" id="email" name="email" className="form-control" value={this.state.email} onChange={this.handleEvent} placeholder="Email" />
                                        <div className="text-danger">{this.state.emailerr}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-2">
                                                <strong><label for="contact">Contact:</label></strong>
                                    </div>
                                    <div className="col-md-8">
                                        <input type = "text" id="contact" name = "contact" className = "form-control" value = {this.state.contact} onChange = {this.handleEvent} placeholder = "Contact Number" />
                                        <div className="text-danger">{this.state.contacterr}</div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                        <div className="col-md-2">
                                                <strong><label for="designation"> Designation:</label></strong>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" id="designation" className="form-control" value={this.state.designation} onChange = {this.handleEvent} placeholder="Designation" name="designation" />
                                                <div className="text-danger">{this.state.designationErr}</div>
                                        </div>
                                </div>
                                <div className="row mt-3">
                                        <div className="col-md-2">
                                                <strong><label for="location">Location:</label></strong>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" id="location" className="form-control" value={this.state.location} onChange = {this.handleEvent} placeholder="Location" name="location" />
                                                <div className="text-danger">{this.state.locationErr}</div>
                                        </div>
                                </div>
                                        <div className="row mt-3">
                                            <div className="col-md-2">
                                               
                                                <strong><label for=""> Username:</label></strong>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" id="username" className="form-control" value={this.state.username} onChange={this.handleEvent} placeholder="Username" name="username" />
                                            </div>
                                        </div>
                                <hr />
                                <div className="row mt-2">
                                    <div className="col-md-8">
                                        <input type="submit" className="btn btn-success" value="Add"/>
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
        else
        {
            return(<React.Fragment>
                <Redirect to="/" />
            </React.Fragment>)
        }
    }
}
export default Createmr;