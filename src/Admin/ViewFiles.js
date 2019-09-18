import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
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
        if(localStorage.getItem("id") != null)
        {
            const { products } = this.state;
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
                                            <li className="breadcrumb-item"><a href="/">Admin</a></li>
                                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Published Files</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <div className="card-box table-responsive">
                                        <h1 className="text-center text-warning">View Uploaded Files</h1>
                                        <table id="datatable-buttons" className="table  table-bordered" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>NAME</th>
                                                    <th>DESCRIPTION</th>
                                                    <th>UPLOADED ON</th>
                                                    <th>Action</th>
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
                                                        <td><a href={"/view/files/" + item.id} target="_blank"><button className="btn btn-info">View</button></a></td>
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
        else
        {
            return(<React.Fragment>
                <Redirect to ="/" />
            </React.Fragment>)
        }
    }
}
export default ViewFiles;