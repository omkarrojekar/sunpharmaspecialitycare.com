import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import Header from '../Mr/Layout/MrHeader';
import Leftbar from '../Mr/Layout/MrLeftBar';
import Footer from '../layout/Footer';

class SendFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            fileId: this.props.match.params.id,
            FileName: ""
        };
    }
    componentDidMount() {
        let data = {
            getMrId: localStorage.getItem("userid"),
            getFileId:this.state.fileId
        };
        const apiUrl = 'http://35.154.116.123/sunpharma/register/alldoctorsofmr/';
        const apiUrl2 = 'http://35.154.116.123/sunpharma/register/getfile/';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        };
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result.data
                    })
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )

        fetch(apiUrl2, options)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result[0].name)
                    this.setState({
                        FileName: result[0].name
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
    send_file_to_doctor = (drId,fileId) =>
    {
        let data = {
            fileId: fileId,
            doctorId: drId,
            filename: this.state.FileName,
        };   
        const apiUrl = 'http://35.154.116.123/sunpharma/register/sendfiletodoctor/';
        const myheader = new Headers();
        myheader.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myheader
        };
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    //alert(result)
                    //console.log(result)
                },
                (error) => {
                    alert(error)
                }
            )
    }
    render() {
        if (localStorage.getItem("userid") != null) {
            const { error, products } = this.state;
            if (error) {
                return (
                    <div>Error: {error.message}</div>
                )
            }
            else {
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
                                                <li className="breadcrumb-item"><a href="#">Medical Representative</a></li>
                                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                                <li className="breadcrumb-item active">Send File</li>
                                            </ol>

                                        </div>
                                    </div>

                                    <div className="container mt-5">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card-box table-responsive">
                                                    <h4 className="m-t-0  text-center"><h2>Doctors</h2></h4>
                                                    <table id="datatable-buttons" className="table table-striped" cellspacing="0" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr No</th>
                                                                <th>NAME</th>
                                                                <th>EMAIL</th>
                                                                <th>ACTION</th>
                                                            </tr>
                                                        </thead>


                                                        <tbody>
                                                            {products.map(item => (
                                                                <tr>
                                                                    <td>{this.count}</td>
                                                                    {this.increase_count()}
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td><a href={"/send/file/" + item.id +"/"+ this.state.fileId + "/"} ><button className="btn btn-info">Send</button></a></td>
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
                <Redirect to="/user/login" />
            </React.Fragment>)
        }
    }
}

export default SendFile;