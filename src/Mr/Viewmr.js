import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

 class Viewmr extends Component {
     constructor(props) {
         super(props);
         this.state = {
             mrId: this.props.match.params.id,
             error: null,
             SingleMr: [],
         };
     }

     componentDidMount() {
         let data = {
             getMrId: this.state.mrId
         };
         const url = 'http://35.154.116.123/sunpharma/register/getmr';
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
                         SingleMr: result,
                         //console.log(result)
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
      const { error, SingleMr } = this.state;
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
                                    <li className="breadcrumb-item"><a href="#">Admin</a></li>
                                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li className="breadcrumb-item active">View Medical Representative</li>
                                </ol>

                            </div>
                        </div>

                        <div className="container mt-5">
                            {SingleMr.map(item => (
                                <div className="card-box">
                                    <h2 className="text-center text-warning">View Medical Reprentative</h2>
                                    <hr />
                                    <p><strong>Name</strong>: {item.name}</p>
                                    <p><strong>Email</strong>: {item.email}</p>
                                    <p><strong>Contact</strong>: {item.contact}</p>
                                    <p><strong>Designation</strong>: {item.designation}</p>
                                    <p><strong>Location</strong>: {item.location}</p>
                                    <hr />
                                    <button className="btn btn-danger" onClick="">Delete</button>
                                    <a href={"/mr/edit/"+item.id}><button className="btn btn-success">Edit</button></a>
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
export default Viewmr;