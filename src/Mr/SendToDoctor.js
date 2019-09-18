import React, { Component } from 'react';
import Header from '../Mr/Layout/MrHeader';
import Leftbar from '../Mr/Layout/MrLeftBar';
import Footer from '../layout/Footer';
import QRCode from 'qrcode.react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class SendToDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
           doctorId: this.props.match.params.id,
            fileId: this.props.match.params.fileId,
            linkId: "",
            DownloadStatus:"",
            message:"",
            contact:""
        };
    }
    componentDidMount() {
        let data = {
            getDoctorId: this.state.doctorId,
            getFileId:this.state.fileId,
            mrId: localStorage.getItem("userid")
        };
        const url = 'http://35.154.116.123/sunpharma/register/getfile';
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
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )


        const apiUrl = 'http://35.154.116.123/sunpharma/register/sendfiletodoctor/';
        fetch(apiUrl,options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        linkId: result.linkid,
                        message: result.text,
                        DownloadStatus: result.downloadstatus,
                        contact:result.contact
                    })
                    //alert(result.text)
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render () {
        if (localStorage.getItem("userid") != null) {
           if(this.state.DownloadStatus == 0)
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

                                           <h4 className="page-title">Welcome {localStorage.getItem("username")}</h4>
                                           <ol className="breadcrumb">
                                               <li className="breadcrumb-item"><a href="#">Medical Reprensentative</a></li>
                                               <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                               <li className="breadcrumb-item active">Send to doctor</li>
                                           </ol>

                                       </div>
                                   </div>
                                   <div className="container mt-5">
                                       <div className="row">
                                           <div className="card-box table-responsive">
                                               <h3 className="text text-warning">{this.state.message}</h3>
                                           </div>
                                           <div className="col-sm-4 col-md-4 col-lg-4">
                                               <div className="card-box table-bordered">
                                                   <QRCode
                                                       value={window.location.origin.toString()+"/login/"+ this.state.linkId + "/" + this.state.contact}
                                                       size={128}
                                                       level={'H'}
                                                   />
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
               return(
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
                                               <li className="breadcrumb-item"><a href="#">Medical Reprensentative</a></li>
                                               <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                               <li className="breadcrumb-item active">Send to doctor</li>
                                           </ol>

                                       </div>
                                   </div>
                                   <div className="container mt-5">
                                       <div className="row">
                                           <div className="col-sm-12">
                                               <div className="card-box table-responsive">
                                                  <h3 className="text text-danger">QR code is  not possible because File is Viewed by Doctor !!!</h3>
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
            return (
                <React.Fragment>
                    <Redirect to="/user/login" />
                </React.Fragment>
            )
        }
    }
}

export default SendToDoctor;