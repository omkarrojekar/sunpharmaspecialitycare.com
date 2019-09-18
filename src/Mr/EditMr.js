import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class EditMr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            designation: "",
            location:"",
            mrId: this.props.match.params.id,
            error: null,
            SingleMr: [],
            message: '',
            ShowMessage: false,
        };
    }
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        let data = {
            getMrId: this.state.mrId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getmr';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        };
        //const apiUrl = 'http://35.154.116.123/sunpharma/register/';
        fetch(url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        SingleMr: result,
                        name: result[0].name,
                        email: result[0].email,
                        contact: result[0].contact,
                        designation: result[0].designation,
                        location: result[0].location,
                        //console.log(result)
                    })
                    console.log(result[0].id)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    update_details = (e) => {
        e.preventDefault();
        //const isValid = this.validate();
            let data = {
                name: this.state.name,
                email: this.state.email,
                contact: this.state.contact,
                designation: this.state.designation,
                location: this.state.location,
                id: this.state.mrId
            };
            const url = 'http://35.154.116.123/sunpharma/register/updatemr';
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
    }
    render() {
        if(localStorage.getItem("id") != null)
        {

        
        const { error, SingleMr } = this.state;
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

                                    <h4 className="page-title">Welcome {localStorage.getItem("name")}</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Admin</a></li>
                                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Update Medical Representative</li>
                                    </ol>

                                </div>
                            </div>

                            <div className="container mt-5">
                                <div className="card-box">
                                    <h2 className="text-center text-warning">Update Medical Reprentative</h2>
                                <hr />
                                    {this.state.ShowMessage == true ? <div><p className="alert alert-success">{this.state.message}</p></div> : <div></div>}
                                {SingleMr.map(item => (
                                    <form onSubmit={this.update_details}>
                                        <div className="row">
                                            <div className="col-md-1">
                                                Name:
                                    </div>
                                            <div className="col-md-8">
                                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleEvent} placeholder="Full Name" />
                                                <div className="text-danger">{this.state.nameerr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-1">
                                                Email:
                                    </div>
                                            <div className="col-md-8">
                                                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleEvent} placeholder="Email" />
                                                <div className="text-danger">{this.state.emailerr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-1">
                                                Contact:
                                            </div>  
                                            <div className="col-md-8">
                                                <input type="text" name="contact" className="form-control" value={this.state.contact} onChange={this.handleEvent} placeholder="Contact Number" />
                                                <div className="text-danger">{this.state.contacterr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-1">
                                                Designation:
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" name="designation" className="form-control" value={this.state.designation} onChange={this.handleEvent} placeholder="Designation" />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-1">
                                                Location:
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" name="location" className="form-control" value={this.state.location} onChange={this.handleEvent} placeholder="Location" />
                                            </div>
                                        </div>
                                            <hr />
                                        <div className="row mt-2">
                                            <div className="col-md-8">
                                                <input type="submit" className="btn btn-success" value="Update" />
                                            </div>
                                        </div>
                                    </form>
                                ))}
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
export default EditMr;