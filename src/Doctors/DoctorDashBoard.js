import React, { Component } from 'react';
import Header from './Layout/DoctorHeader';
import Leftbar from './Layout/DoctorLeftBar';
import Footer from '../layout/Footer';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

class DoctorDashboard extends Component {
  render() {
    if (localStorage.getItem("userid") != null) {
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
                  {localStorage.getItem("userrole")}


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

export default DoctorDashboard;
