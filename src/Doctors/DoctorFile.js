/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import {
    Redirect,
} from "react-router-dom";

class DoctorFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileId: this.props.match.params.id / 1532358,
            linkId: this.props.match.params.linkId,
            error: null,
            SingleFile: [],
            ShowStatus:'',
            IsDownload:''
        };
    }
    handleClick(e) {
       //e.preventDefault()
        let data = {
            getLinkId: this.state.linkId
        };
        const url = 'http://35.154.116.123/sunpharma/register/adddownloaddate';
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
                    //console.log(result[0].mr)
                    //  console.log(result)
                },
                (error) => {
                    this.setState({ error })
                    //console.log(error)
                }
            )
    }
    componentDidMount() {
        let data = {
            getFileId: this.state.fileId,
            getLinkId: this.state.linkId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getdoctorfile';
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
                    this.setState({
                        SingleFile: result.file,
                        ShowStatus: result.show_status,
                        IsDownload:result.isDownload
                        
                    })
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                    console.log(error)
                }
            )
    }
    render () {
        const { SingleFile, ShowStatus, IsDownload} = this.state;
        if (ShowStatus == 0)
       {
           return(
            <React.Fragment>
            <h1 className="text text-center"></h1>
                   {IsDownload == 'not yet' ? <a href={SingleFile} download className="btn btn-info" onClick={e => this.handleClick(e)}>Download</a>: ""} 
            </React.Fragment>   
           )
       }
        return (
            <React.Fragment>
                    <object data={SingleFile} className="viewfile col-sm-12 col-md-12"></object>
                <a href={SingleFile} download className="btn btn-info" onClick={e => this.handleClick(e)}>Download</a>
            </React.Fragment>
        )
    }
}

export default DoctorFile;