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

class TrackDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            DoctorId:this.props.match.params.id,
            DoctorName:''
        };
    }
    componentDidMount() {
        let data = {
            getDoctorId: this.state.DoctorId
        };
        const apiUrl = 'http://35.154.116.123/sunpharma/register/filesharingofdoctor';
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
                        products: result.data,
                        DoctorName:result.drname
                    })
                    //console.log("result: ",result.data)
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
        if (localStorage.getItem("id") != null) {
            const {  products } = this.state;
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
                                            <li className="breadcrumb-item active">File Share Tracker</li>
                                        </ol>

                                    </div>
                                </div>

                                <div className="container mt-5">

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-box table-responsive react-data-table-component">
                                                <h4 className="m-t-0  text-center"><h2 className="text-warning">File  Sharing Tracker of "{this.state.DoctorName}"</h2></h4>
                                                <table id="datatable" class="table  table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr No</th>
                                                            <th>File Name</th>
                                                            <th>SHARE BY</th>
                                                            <th>SHARED ON</th>
                                                            <th>VISITED PAGE</th>
                                                            <th>VIEWED ON</th>
                                                            <th>VIEW FILE</th>
                                                        </tr>
                                                    </thead>


                                                    <tbody>
                                                        {products == "" ? <tr><td colSpan="6" className="text text-center">No Files shared with {this.state.DoctorName}</td></tr> : <div></div>}
                                                        {products.map(item => (
                                                            <tr>
                                                                <td>{this.count}</td>
                                                                {this.increase_count()}
                                                                <td>{item.filename}</td>
                                                                <td>{item.mrname}</td>
                                                                <td>{item.send_on}</td>
                                                                <td>{item.visited}</td>
                                                                <td>{item.viewed}</td>
                                                                <td class="middle-align"><a href={"/view/files/" + item.fileid} ><button className="btn btn-info">View</button></a>
                                                                </td>
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
        else {
            return (
                <React.Fragment>
                    <Redirect to="/" />
                </React.Fragment>
            )
        }
    }
}

export default TrackDoctor;