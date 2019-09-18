import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { Descriptions } from 'antd';



class ViewDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: this.props.match.params.id,
            error: null,
            SingleDoctor: [],
        };
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
                        //console.log(result)
                    })
                    console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    delete(id) {
        //alert(id);
    }
    render() {
        if(localStorage.getItem("id") != null)
        {
        const { error, SingleDoctor } = this.state;
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
                                        <li className="breadcrumb-item"><a href="/">Admin</a></li>
                                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                        <li className="breadcrumb-item active">View Doctor</li>
                                    </ol>

                                </div>
                            </div>

                            <div className="container mt-5">
                                {SingleDoctor.map(item => (
                                    <div className="card-box">
                                        <h2 className="text-center text-warning">View Doctor</h2>
                                        <hr />
                                        <p><strong>Name</strong>: Dr. {item.name}</p>
                                        <p><strong>Email</strong>: {item.email}</p>
                                        <p><strong>Contact</strong>: {item.contact}</p>
                                        <hr />
                                        <button className="btn btn-danger" onClick={this.delete(item.id)}>Delete</button>
                                        <a href={"/doctor/edit/"+item.id}><button className="btn btn-success">Edit</button></a>
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
export default ViewDoctor;