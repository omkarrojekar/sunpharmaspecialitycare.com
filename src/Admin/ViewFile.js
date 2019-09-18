import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Leftbar from '../layout/Leftbar';
import {
    BrowserRouter as Router,
    Redirect,
    Link
} from "react-router-dom";

class ViewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileId: this.props.match.params.id,
            error: null,
            SingleFile: [],
        };
    }
    componentDidMount() {
        let data = {
            getFileId: this.state.fileId
        };
        const url = 'http://35.154.116.123/sunpharma/register/getfile';
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
                        SingleFile: result,
                    })
                    //console.log(result)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    //open_file(url) {
      //  window.open(url, '_blank');
    //}
    render () {
        if(localStorage.getItem("id") != null)
        {

        
        const { error, SingleFile } = this.state;
        return (
            <React.Fragment>
                <div className="box">
                    {SingleFile.map(item => (
                        <a href={item.base64} download={ item.name } className="btn btn-info text-center">Download</a>
                    ))}
                </div>
                {SingleFile.map(item => (
                        <object data={item.base64} className="viewfile col-sm-12 col-md-12">
                        </object>
                ))}
            </React.Fragment>
            
        )
    }
    else
    {
        return(
            <React.Fragment>
                <Redirect to="/" />
            </React.Fragment>
        )
    }
    }
}

export default ViewFile;