import React, { Component } from 'react';
import {Link} from "react-router-dom";
//import Create from '../public/Mr/Create'
 function Leftbar() {

        return (
                <div className="sidebar-inner slimscrollleft">
                    <div id="sidebar-menu">
                        <ul>
                            <li className="text-muted menu-title">Navigation</li>
                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i className="ti-home"></i> <span> Dashboard </span> <span className="menu-arrow"></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="/">Home</a></li>
                                </ul>
                            </li>
                        <li className="has_sub">
                            <a href="#" className="waves-effect"><i className="md-insert-drive-file"></i> <span> Files </span> <span className="menu-arrow"></span></a>
                            <ul className="list-unstyled">
                                <li><a href="/publish">Publish File</a></li>
                                <li><a href="/view/files">View Published Files</a></li>
                                <li><a href="/track/files">Track</a></li>
                            </ul>
                        </li>
                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i className="ti-user"></i> <span> MR </span> <span className="menu-arrow"></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="/mr/create">Create</a></li>
                                    <li><a href="/mr/manage">Manage</a></li>
                                </ul>
                            </li>
                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Doctor </span> <span className="menu-arrow"></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="/doctor/create">Create</a></li>
                                    <li><a href="/doctor/manage">Manage</a></li>    
                                </ul>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            
        )
    }

export default Leftbar;