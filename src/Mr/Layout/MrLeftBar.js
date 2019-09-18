import React, { Component } from 'react';



class MrLeftBar extends Component {
    render () {
        return (
            <div className="sidebar-inner slimscrollleft">
                <div id="sidebar-menu">
                    <ul>
                        <li className="text-muted menu-title">Navigation</li>
                        <li className="has_sub">
                            <a href="#" className="waves-effect"><i className="ti-home"></i> <span> Dashboard </span> <span className="menu-arrow"></span></a>
                            <ul className="list-unstyled">
                                <li><a href="/mr/dashboard">Home</a></li>
                                <li><a href="/files">View Files</a></li>
                            </ul>
                        </li>
                        <li className="has_sub">
                            <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Doctor </span> <span className="menu-arrow"></span></a>
                            <ul className="list-unstyled">
                                <li><a href="/doctors">View</a></li>
                            </ul>
                        </li>
                        <li className="has_sub">
                            <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Account </span> <span className="menu-arrow"></span></a>
                            <ul className="list-unstyled">
                                <li><a href="/change/password">Change Password</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}

export default MrLeftBar;