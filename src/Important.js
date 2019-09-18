import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import mysql from 'mysql';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Leftbar from './layout/Leftbar';
import Createmr from './Createmr';

//import header from '../public/layout/Header'



class App extends Component {
    state = {
        name: "",
        email: "",
        contact:""
    };
    handleName = (e) =>{
        //console.log(e.target.value)
        this.setState({
            name: e.target.value,
    
        });
    }
    handleEmail = (e) =>{
        this.setState({
            email: e.target.value,
        });
    }
     handleContact = (e) => {
         this.setState({
             contact: e.target.value,
         });
     }
     save_details =(e) => {
         console.log(e.target[0].value);
         console.log(e.target[1].value);
         console.log(e.target[2].value);
         console.log(mysql.createConnection);
         //document.getElementById('name').innerHTML = e.target[1].value;
        e.preventDefault();
     }
     
  render() {
    
    return (
        <React.Fragment>
        <Router>
            <Route path="/createmr" exact component={Createmr} />
            
            <div id="wrapper">
                    <Header />
           <div className="left side-menu">
           <Leftbar />
            </div>

             <div className="content-page">
                <div className="content">
                        <div className="row">
                            <div className="col-sm-12">

                                <h4 className="page-title">Dashboard 2</h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Ubold</a></li>
                                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Dashboard 2</li>
                                </ol>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-attach-money text-primary"></i>
                                    <h2 className="m-0 text-dark counter font-600">50568</h2>
                                    <div className="text-muted m-t-5">Total Revenue</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-add-shopping-cart text-pink"></i>
                                    <h2 className="m-0 text-dark counter font-600">1256</h2>
                                    <div className="text-muted m-t-5">Sales</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-store-mall-directory text-info"></i>
                                    <h2 className="m-0 text-dark counter font-600">18</h2>
                                    <div className="text-muted m-t-5">Stores</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-account-child text-custom"></i>
                                    <h2 className="m-0 text-dark counter font-600">8564</h2>
                                    <div className="text-muted m-t-5">Users</div>
                                </div>
                            </div>
                        </div>
                            <div className="container mt-5">

        <form onSubmit={this.save_details}>
            <div className="row">
                <div className="col-md-1">
                    Name:
                </div>
                <div className="col-md-8">
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleName} />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-1">
                    Email:
                </div>
                <div className="col-md-8">
                    <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmail} />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-1">
                    Contact:
                </div>
                <div className="col-md-8">
                    <input type="text" className="form-control" value={this.state.contact} onChange={this.handleContact} />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-8">
                    <input type="submit" className="btn btn-success" value="Add"/>
                </div>
            </div>
        </form>
        
      </div>
                </div> 
                <Footer />
            </div>
           </div>
           </Router>
        </React.Fragment>
    )
  }
}

export default App;