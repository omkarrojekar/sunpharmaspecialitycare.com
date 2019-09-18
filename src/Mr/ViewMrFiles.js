import React, { Component } from 'react';
import Header from '../Mr/Layout/MrHeader';
import Leftbar from '../Mr/Layout/MrLeftBar';
import Footer from '../layout/Footer';

import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

 class ViewFiles extends Component {
     constructor(props) {
         super(props);
         this.state = {
             error: null,
             products: [],
         };
     }

     componentDidMount() {
         const apiUrl = 'http://35.154.116.123/sunpharma/register/allfiles/';
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
         this.count = 1;
     }
     increase_count() {
         this.count = this.count + 1
     }
    render() {
        if(localStorage.getItem("userid") != null)
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

                                        <h4 className="page-title">Welcome {localStorage.getItem("username")}</h4>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/">Medical Representative</a></li>
                                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Uploaded Files</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <hr />
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-box table-responsive">
                                                <h2 className="m-t-0  text-center text-warning">Uploaded Files</h2>
                                                <table id="datatable-buttons" className="table  table-bordered" cellspacing="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr No</th>
                                                            <th>NAME</th>
                                                            <th>DESCRIPTION</th>
                                                            <th>UPLOADED ON</th>
                                                            <th>ACTION</th>
                                                        </tr>
                                                    </thead>


                                                    <tbody>
                                                        {products.map(item => (
                                                            <tr>
                                                                <td>{this.count}</td>
                                                                {this.increase_count()}
                                                                <td>{item.name}</td>
                                                                <td>{item.description}</td>
                                                                <td>{item.date}</td>
                                                                <td><a href={"/files/send/"+item.id} ><button className="btn btn-info">Send</button></a></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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
                <Redirect to ="/user/login" />
            </React.Fragment>)
        }
    }
}
export default ViewFiles;