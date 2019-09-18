import React, { Component } from 'react';
import Header from './Layout/DoctorHeader';
import Leftbar from './Layout/DoctorLeftBar';
import Footer from '../layout/Footer';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class ViewSharedFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileId: this.props.match.params.fileId,
            sharedId: this.props.match.params.id,
            error: null,
            SingleFile: []
        };
    }
    componentDidMount() {
        let data = {
            getFileId: this.state.fileId,
            getSharedId: this.state.sharedId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getfile';
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
                    this.setState({
                        SingleFile: result,
                    })
                    console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    const ApiUrl = 'http://35.154.116.123/sunpharma/register/changeviewstatus';
        fetch(ApiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        SingleFile: result,
                    })
                    console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render() {
        if (localStorage.getItem("userid") != null) {
            const { error, SingleFile } = this.state;
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
                                            <li className="breadcrumb-item"><a href="#">Doctor</a></li>
                                            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Home</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="container mt-5">
                                    {SingleFile.map(item => (
                                        <div className="card-box">
                                            <h2 className="text-center text-warning">View File</h2>
                                            <hr />
                                            <p><strong>File Name</strong>: {item.name}</p>
                                            <p><strong>File DESCRIPTION</strong>: {item.description}</p>
                                            <p><a href="/../../public/uploads/5.jpg" className="btn btn-info" target="_blank">Download</a></p>
                                            <hr />
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
            return (
                <React.Fragment>
                    <Redirect to="/user/login" />
                </React.Fragment>
            )
        }
    }
}

export default ViewSharedFile;