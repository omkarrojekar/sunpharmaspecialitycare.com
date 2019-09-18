import React, { Component } from 'react';
import  axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

 class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
        }
    }
     componentDidMount() {
         //axios.get(`http://35.154.116.123/sunpharma/Register/alldoctors/`)
         axios.get(`http://35.154.116.123/sunpharma/alldoctors/`)
         .then(( res ) =>{
             console.log(res)
            this.setState({values:res.data})
         })
     }
    



   



    render() {
            return (
                <React.Fragment>
                    <ul classNametext="text text-center">{this.state.values.map(item => <li className="text-primary">{item.name}</li>)}</ul>
                </React.Fragment>
            )
    }
}
export default Demo;