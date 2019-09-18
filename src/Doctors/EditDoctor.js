import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";


class EditDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            mrId:"",
            doctorId: this.props.match.params.id,
            error: null,
            SingleDoctor: [],
            products:[],
            message:'',
            ShowMessage:false,
        };
    }
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        let data = {
            getDoctorId: this.state.doctorId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getdoctor';
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
                        SingleDoctor: result,
                        name: result[0].name,
                        email: result[0].email,
                        contact: result[0].contact,
                        mrId: result[0].mr
                        //console.log(result)
                    })
                    //console.log(result[0].mr)
                },
                (error) => {
                    this.setState({ error })
                }
            )

        const apiUrl = 'http://35.154.116.123/sunpharma/register';
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    })
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
            mr:this.state.mrId,
            doctorId: this.state.doctorId
        };
        console.log(data);
        const url = 'http://35.154.116.123/sunpharma/register/updatedoctor';
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
                            ShowMessage:true,
                            message:result
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

        
        const {SingleDoctor, products } = this.state;
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
                                        <li className="breadcrumb-item active">Update Doctor</li>
                                    </ol>

                                </div>
                            </div>

                            <div className="container mt-5">
                                {SingleDoctor.map(item => (
                                    <div className="card-box">
                                    <h2 className="text-center text-warning">Update Doctor</h2>
                                    <hr />
                                        {this.state.ShowMessage == true ? <div><p className="alert alert-success">{this.state.message}</p></div> : <div></div>}
                                        
                                    <form onSubmit={this.update_details}>
                                        <div className="row">
                                            <div className="col-md-2">
                                                Name:
                                    </div>
                                            <div className="col-md-8">
                                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleEvent} placeholder="Full Name" />
                                                <div className="text-danger">{this.state.nameerr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-2">
                                                Email:
                                    </div>
                                            <div className="col-md-8">
                                                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleEvent} placeholder="Email" />
                                                <div className="text-danger">{this.state.emailerr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-2">
                                                Contact:
                                        </div>
                                            <div className="col-md-8">
                                                <input type="text" name="contact" className="form-control" value={this.state.contact} onChange={this.handleEvent} placeholder="Contact Number" />
                                                <div className="text-danger">{this.state.contacterr}</div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-2">
                                                Select Head MR:
                                        </div>
                                            <div className="col-md-8">
                                                <select class="form-control" id="mrId" name="mrId" value={this.state.mrId} onChange={this.handleEvent}>
                                                    <option value="">---Select MR---</option>
                                                    {products.map(item => (
                                                        <option value={item.id} selected={item.id == this.state.mrId ? "selected" : ""} data-value={this.state.mrId}>{item.name}</option>
                                                    ))}
                                                </select>
                                                
                                                <div className="text-danger">{this.state.mrerror}</div>
                                            </div>
                                        </div>
                                            <hr />
                                        <div className="row mt-2">
                                            <div className="col-md-8">
                                                <input type="submit" className="btn btn-success" value="Update" />
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                ))}
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
export default EditDoctor;