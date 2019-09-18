import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class DeleteMr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mrId: this.props.match.params.id,
        };
    }
    componentDidMount() {
        let data = {
            getMrId: this.state.mrId
        };
        const url = 'http://35.154.116.123/sunpharma/register/deletemr';
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
                    //console.log(result[0].id)
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }
    render () {
        return (
            <div>
                <Redirect to= "/mr/manage"/>
            </div>
        )
    }
}

export default DeleteMr;