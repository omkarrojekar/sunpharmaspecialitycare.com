import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            totalFiles:'',
            totalDoctors:'',
            totalMrs:''
     
        };
    }
    componentDidMount() {
        const apiUrl = 'http://35.154.116.123/sunpharma/register/getdashboarddetails';
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        totalFiles: result['totalFiles'],
                        totalDoctors: result['totalDoctors'],
                        totalMrs: result['totalMrs']
                    })
                    console.log('result:',result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render() {
        if (localStorage.getItem("id") != null) {
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
                                            <li className="breadcrumb-item active">Home</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-xl-4">
                                        <div className="widget-panel widget-style-2 bg-white">
                                            <i className="md-insert-drive-file text-primary"></i>
                                            <h2 className="m-0 text-dark counter font-600">{this.state.totalFiles}</h2>
                                            <div className="text-muted m-t-5">Total Files Uploaded</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-4">
                                        <div className="widget-panel widget-style-2 bg-white">
                                            <i className="ti-user text-primary"></i>
                                            <h2 className="m-0 text-dark counter font-600">{this.state.totalMrs}</h2>
                                            <div className="text-muted m-t-5">Total MRs</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-4">
                                        <div className="widget-panel widget-style-2 bg-white">
                                            <i className="ti-user"></i>
                                            <h2 className="m-0 text-dark counter font-600">{this.state.totalDoctors}</h2>
                                            <div className="text-muted m-t-5">Total Doctors</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-5">
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
                    <Redirect to="/" />
                </React.Fragment>
            )
        }
    }
}

export default DashBoard;