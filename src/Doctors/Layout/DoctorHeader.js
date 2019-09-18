import React, { Component } from 'react'

class DoctorHeader extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="topbar">
                    <div className="topbar-left">
                        <div className="text-center">
                            <a href="/" className="logo"><i className="icon-sun"></i><span>DOC<i className=""></i>TOR</span></a>
                        </div>
                    </div>
                    <nav className="navbar-custom">
                        <ul className="list-inline float-right mb-0">
                            <li className="list-inline-item dropdown notification-list">
                                <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src="../assets/assets/images/users/avatar-1.jpg" alt="user" className="rounded-circle" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">
                                    <div className="dropdown-item noti-title">
                                        <h5 className="text-overflow"><small>Welcome ! {localStorage.getItem("username")}</small> </h5>
                                    </div>
                                    <hr />
                                    <a href="/user/logout" className="dropdown-item notify-item">
                                        <i className="zmdi zmdi-power"></i> <span>Logout</span>
                                    </a>

                                </div>
                            </li>
                        </ul>

                        <ul className="list-inline menu-left mb-0">
                            <li className="float-left">
                                <button className="button-menu-mobile open-left waves-light waves-effect">
                                    <i className="dripicons-menu"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default DoctorHeader;