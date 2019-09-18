import React, { Component } from 'react';
import {
    Redirect
} from "react-router-dom";

class DoctorLogin extends Component {
    constructor(props) {
       super(props);
        this.state = {
            contact:this.props.match.params.contact,
            otp: "",
            id: "",
            linkId:this.props.match.params.id,
            redirect:'false',
            fileId:'',
            message:'',
            errMessage: '',
            ShowMessage:false
        };
    }
    componentDidMount(){
        let data = {
            getContactNumber: this.state.contact,
            getLinkId: this.state.linkId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getdoctorcredentials';
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
                    //console.log(result)
                    //alert(result['text'])
                    this.setState({
                        message:result['text']
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    check_credentials = (e) => {
        e.preventDefault();
        let data = {
            getContactNumber: this.state.contact,
            getLinkId: this.state.linkId,
            otp: this.state.otp,
        };
        const url = 'http://35.154.116.123/sunpharma/register/checkcredentials';
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
                   // alert(result['text']);
                    //console.log(result)
                    this.setState({
                        fileId:result['fileid'],
                        redirect: result['redirect'],
                        ShowMessage:true,
                        errMessage:result.text
                    })
                },
                (error) => {
                    this.setState({ error });
                    console.log(error.message)
                }
            )

    }
    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

  render() {
      const redirectToReferrer = this.state.redirect;
      if (redirectToReferrer == 'true') 
      {
          window.location.href = window.location.origin.toString() + "/file/" + this.state.fileId * 1532358 + "/" + this.state.linkId;
      }
      else
      {
          return (
              <React.Fragment>
                  <div className="wrapper-page">
                      <div className="card-box">
                          <div className="panel-heading">
                              <h4 class="text-center"><strong class="text-custom">Doctor</strong> Login</h4>
                          </div>

                          <div className="p-20">
                          
                              {this.state.ShowMessage == true ? <div><p className="alert alert-danger">{this.state.errMessage}</p></div> : <div></div>}
                              <form class="form-horizontal m-t-20" onSubmit={this.check_credentials}>
                                  <div className="form-group ">
                                      <div className="col-12">
                                          <input class="form-control" type="text" name="contact" placeholder="Contact Number" value={this.state.contact} onChange={this.handleEvent} />
                                      </div>
                                  </div>
                                  <div className="form-group mt-45">
                                      <div className="col-12">
                                          <input class="form-control" type="text" name="otp" placeholder="Enter OTP" value={this.state.otp} onChange={this.handleEvent} />
                                      </div>
                                  </div>
                                  <div className="form-group text-center m-t-25">
                                      <div className="col-12">
                                          <button class="btn btn-info btn-block text-uppercase waves-effect waves-light" type="submit">
                                              View File
								</button>
                                      </div>
                                  </div>
                              </form>

                          </div>
                      </div>

                  </div>
              </React.Fragment>
          )
      }
  }
}

export default DoctorLogin;