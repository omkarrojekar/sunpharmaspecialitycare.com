import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import SweetAlert  from 'react-bootstrap-sweetalert';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

const datas = [];
 class Managemr extends Component { 
     
     
    constructor(props){
        super(props);
        this.state = {
            error:null,
            products: [],
        };
        this.count = 1;
    }
     increase_count()
     {
         this.count = this.count + 1
     }

    componentDidMount() {
        const apiUrl = 'http://35.154.116.123/sunpharma/register/';
        fetch(apiUrl)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    products:result,
                    datas:result
                })
            },
            (error) => {
                this.setState({ error })
            }
        )
    }
    render() {
        if(localStorage.getItem("id") !=null)
        {
        const {error , products} = this.state;
        if(error)
        {
                return(
                    <div>Error: {error.message}</div>
                )
        }
        else
        {
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
                                            <li className="breadcrumb-item active">Manage Medical Representative</li>
                                        </ol>

                                    </div>
                                </div>
                            
                                    <div className="container mt-5">
                                        <hr />
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-box table-responsive react-data-table-component">
                                                <h2 className="m-t-0  text-center text-warning">Medical Representative</h2>
                                                <table id="datatable" class="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr No</th>
                                                            <th>NAME</th>
                                                            <th>EMAIL</th>
                                                            <th>CONTACT</th>
                                                            <th>DESIGNATION</th>
                                                            <th>ACTION</th>
                                                        </tr>
                                                    </thead>


                                                    <tbody>
                                                        {products.map(item => (
                                                            <tr>
                                                                <td>{this.count}</td>
                                                                {this.increase_count()}
                                                                <td><a className="doctor-link" href={"/mr/doctors/" + item.id}>{item.name}</a></td>
                                                                <td>{item.email}</td>
                                                                <td>{item.contact}</td>
                                                                <td>{item.designation}</td>
                                                                <td class="middle-align"><a href={item.id} ><button className="btn btn-info">View</button></a>
                                                                    <a href={"/mr/delete/" + item.id}><button className="btn btn-danger">Delete</button></a></td>
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
    }
        else {
            return (<React.Fragment>
                <Redirect to="/" />
            </React.Fragment>)
        }
    }
}
export default Managemr;
