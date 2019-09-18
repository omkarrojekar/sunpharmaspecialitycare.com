import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

export default class Publish extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileName:'',
            base64ofZFile:'',
            fileDescription:'',
            message: '',
            ShowMessage: false,
        }
    }
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }   

    onchange(e)
    {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        //console.log(files[0])
        this.setState({
            selectedFile: files[0],
            fileName: e.target.files[0].name,
        })

        reader.onload=(e) =>{
            //console.log(e.target.result);
            this.setState({
                base64ofZFile: e.target.result
            })
            
        }
    }
    fileUploadHandler = (e) => {
        e.preventDefault();
        //alert('hii');
        let data = {
            fileName: this.state.fileName,
            base64: this.state.base64ofZFile,
            fileDescription: this.state.fileDescription,
        };
        const url = 'http://35.154.116.123/sunpharma/register/publish';
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
                   
                   console.log('Result: ',result);
                    //alert(result)
                    this.setState({
                        ShowMessage: true,
                        message: result
                    })
                },
                (error) => {
                    this.setState({ error });
                    //console.log('Error: ',error);
                   
                }
            )

    }


    render() {
        if (localStorage.getItem("id") != null)
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
                                            <li className="breadcrumb-item"><a href="/">Admin</a></li>
                                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                            <li className="breadcrumb-item active">Publish File</li>
                                        </ol>

                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <div className="card-box">
                                    <h1 className="text-center text-success">Publish File</h1>
                                    <hr />
                                        {this.state.ShowMessage == true ? <div><p className="alert alert-success">{this.state.message}</p></div> : <div></div>}
                                    <form onSubmit={this.fileUploadHandler} enctype="multipart/form-data">
                                        <div className="row mt-2">
                                            <div className="col-md-2">
                                                Select File:
                                    </div>
                                            <div className="col-md-8">
                                                <input type="file" name="file" className="form-control" onChange={(e) => this.onchange(e)} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-2">
                                                Description:
                                    </div>
                                            <div className="col-md-8">
                                                <textarea className="form-control" onChange={this.handleEvent} name="fileDescription" value={this.state.fileDescription}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row mt-2">
                                            <div className="col-md-8">
                                                <input type="submit" className="btn btn-success" value="Upload" />
                                            </div>
                                        </div>
                                    </form>
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
                <Redirect to="/" />
            </React.Fragment>)
        }
    }
}