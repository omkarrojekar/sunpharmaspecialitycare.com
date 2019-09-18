import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

 class CreateDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            name: "",
            email: "",
            contact: "",
            mrId: "",
            nameerr: "",
            emailerr: "",
            contacterr: "",
            mrerror:"",
            message: '',
            ShowMessage: false,
        };
    }

    componentDidMount() {
        const apiUrl = 'http://35.154.116.123/sunpharma/register';
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    })
                    //console.log(result)
                },
                
                (error) => {
                    this.setState({ error })
                }
            )
    }
 
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    resetform = () => {
        this.setState({ name: "", email: "", contact: "" })
    }

    validate = () => {
        let emailerr = "";
        let nameerr = "";
        let contacterr = "";
        let mrerror = "";


        if (!this.state.email.includes("@")) {
            emailerr = "The Email you entered is not valid !!!";
        }
        if (!this.state.name) {
            nameerr = "Name field Should not be Empty !!!";
        }

        if (!this.state.contact) {
            contacterr = "Contact field Should not be Empty !!!";
        }

        if(this.state.mrId == "")
        {
            mrerror = "Please Select MR !!!";
        }
        if (emailerr || nameerr || contacterr || mrerror) {
            this.setState({ emailerr });
            this.setState({ nameerr });
            this.setState({ contacterr });
            this.setState({ mrerror });
            return false;
        }
        return true;
    }

    save_details = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let data = {
                name: this.state.name,
                email: this.state.email,
                contact: this.state.contact,
                mrId: this.state.mrId
            };
            const url = 'http://35.154.116.123/sunpharma/register/adddoctor';
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
            //console.log(e.target[0].value);
            //console.log(e.target[1].value);
            //console.log(e.target[2].value);
            //console.log(e.target[3].value);
            this.resetform();
        }

    }
    render() {
        if(localStorage.getItem("id") != null)
        {

        
        const { error, products } = this.state;
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
                                        <li className="breadcrumb-item active">Create Doctor</li>
                                    </ol>

                                </div>
                            </div>
                            <div className="container mt-5">
                                <div className="card-box">
                                    <h2 className="text-center text-success">New Doctor</h2>
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
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <strong><label for="email">Email:</label></strong>
                                    </div>
                                        <div className="col-md-8">
                                            <input type="text" id="email" name="email" className="form-control" value={this.state.email} onChange={this.handleEvent} placeholder="Email Address" />
                                            <div className="text-danger">{this.state.emailerr}</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <strong><label for="contact">Contact:</label></strong>
                                    </div>
                                        <div className="col-md-8">
                                            <input type="text" id="contact" name="contact" className="form-control" value={this.state.contact} onChange={this.handleEvent} placeholder="Contact Number" />
                                            <div className="text-danger">{this.state.contacterr}</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <strong><label for="mrId">Select MR:</label></strong>
                                    </div>
                                        <div className="col-md-8">
                                            <select class="form-control" id="mrId" name="mrId" value={this.state.mrId} onChange={this.handleEvent}>
                                            <option value="">---Select MR---</option>
                                            {products.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                            ))}
                                            </select>
                                            <div className="text-danger">{this.state.mrerror}</div>
                                        </div>
                                    </div>
                                        <hr />
                                    <div className="row mt-2">
                                        <div className="col-md-8">
                                            <input type="submit" className="btn btn-success" value="Add" />
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
            return (<React.Fragment>
                <Redirect to="/" />
            </React.Fragment>)
        }
    }
}

export default CreateDoctor;