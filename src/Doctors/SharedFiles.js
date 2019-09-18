import React, { Component } from 'react';
import Header from './Layout/DoctorHeader';
import Leftbar from './Layout/DoctorLeftBar';
import Footer from '../layout/Footer';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";


class SharedFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            Doctor_Name: ''

        };
    }
    componentDidMount() {
        let data = {
            doctorId: localStorage.getItem("userid")
        };
        const apiUrl = 'http://35.154.116.123/sunpharma/register/getallsharedfileswithdoctor/';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        }; 
        fetch(apiUrl,options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
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
                                        <h4 className="page-title">Welcome {localStorage.getItem("username")}</h4>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Doctor</a></li>
                                            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Shared Files</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <div className="card-box table-responsive">
                                        <h2 className="m-t-0  text-center text-warning">Files Shared With {localStorage.getItem("username")}</h2>
                                        <table id="datatable-buttons" className="table table-bordered" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>SR NO</th>
                                                    <th>FILE NAME</th>
                                                    <th>SHARED BY</th>
                                                    <th>SHARED ON</th>
                                                    <th>ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map(item => (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.filename}</td>
                                                        <td>{item.mrname}</td>
                                                        <td>{item.send_on}</td>
                                                        <td><a href={"/shared/files/"+ item.id + "/" + item.fileid}><button className="btn btn-info">View</button></a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default SharedFiles;