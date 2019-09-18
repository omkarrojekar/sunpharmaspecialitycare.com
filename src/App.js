import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import LogOut from './Admin/LogOut';
import AdminLogin from './Admin/AdminLogin';
import DashBoard from './Admin/DashBoard';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Leftbar from './layout/Leftbar';
import Createmr from './Mr/Createmr';
import Managemr from './Mr/Managemr';
import Viewmr from './Mr/Viewmr';
import CreateDoctor from './Doctors/CreateDoctor';
import ManageDoctor from './Doctors/ManageDoctor';
import ViewDoctor from './Doctors/ViewDoctor';
import Publish from './Admin/Publish';
import ViewFiles from './Admin/ViewFiles';
import ViewFile from './Admin/ViewFile';
import EditMr from './Mr/EditMr';
import EditDoctor from './Doctors/EditDoctor';
import UserLogin from './Doctors/UserLogin';
import MrDashBoard from './Mr/MrDashBoard';
import DoctorDashboard from './Doctors/DoctorDashBoard';
import UserLogout from './Doctors/UserLogout';
import ViewDoctors from './Mr/ViewDoctors';
import ViewMrFiles from './Mr/ViewMrFiles';
import SendFile from './Mr/SendFile';
import ChangePassword from './Mr/ChangePassword';
import ChangeUsername from './Account/ChangeUsername';
import SendToDoctor from './Mr/SendToDoctor';
import SharedFiles from './Doctors/SharedFiles';
import ViewSharedFile from './Doctors/ViewSharedFile';
import DoctorLogin from './Doctors/DoctorLogin';
import DoctorFile from './Doctors/DoctorFile';
import TrackDoctor from './Doctors/TrackDoctor';
import DeleteDoctor from './Doctors/DeleteDoctor';
import TrackFiles from './Admin/TrackFiles';
import DeleteMr from './Mr/DeleteMr';
import ViewMrDoctor from './Mr/ViewMrDoctor';
import Demo from './Admin/Demo' ;
import DoctorsOfMr from './Mr/DoctorsOfMr';


function App() 
{
    return (
        <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/demo" exact component={Demo} />
            <Route path="/admin/login" exact component={AdminLogin} />
            <Route path="/dashboard" exact component={DashBoard} />
            <Route path="/mr/dashboard" exact component={MrDashBoard} />
            <Route path="/doctor/dashboard" exact component={DoctorDashboard} />
            <Route path="/logout" exact component={LogOut} />
            <Route path="/publish" exact component={Publish} />
            <Route path="/view/files" exact component={ViewFiles} />
            <Route path="/view/files/:id" exact component={ViewFile} />
            <Route path="/mr/create" exact component={Createmr} />
            <Route path="/mr/manage" exact component={Managemr} />
            <Route path="/mr/:id" exact component={Viewmr} />
            <Route path="/mr/doctor/view/:id" exact component={ViewMrDoctor} />
            <Route path="/mr/delete/:id" exact component={DeleteMr} />
            <Route path="/mr/edit/:id" exact component={EditMr} />
            <Route path="/doctor/create" exact component={CreateDoctor} />
            <Route path="/doctor/manage" exact component={ManageDoctor} />
            <Route path="/doctor/track/:id" exact component={TrackDoctor} />
            <Route path="/doctors" exact component={ViewDoctors} />
            <Route path="/mr/doctors/:id" exact component={DoctorsOfMr} />
            <Route path="/doctor/:id" exact component={ViewDoctor} />
            <Route path="/doctor/delete/:id" exact component={DeleteDoctor} />
            <Route path="/doctor/edit/:id" exact component={EditDoctor} />
            <Route path="/user/login" exact component={UserLogin} />
            <Route path="/login/:id/:contact" exact component={DoctorLogin} />
            <Route path="/user/logout" exact component={UserLogout} />
            <Route path="/files" exact component={ViewMrFiles} />
            <Route path="/file/:id/:linkId" exact component={DoctorFile} />
            <Route path="/files/send/:id" exact component={SendFile} />
            <Route path="/change/password/" exact component={ChangePassword} />
            <Route path="/change/username/" exact component={ChangeUsername} />
            <Route path="/send/file/:id/:fileId" exact component={SendToDoctor} />
            <Route path="/shared/files/" exact component={SharedFiles} />
            <Route path="/shared/files/:id/:fileId" exact component={ViewSharedFile} />
            <Route path="/track/files" exact component={TrackFiles} />
        </Switch>
        </Router>
        
    );
  }
  

  const Home = () => (
      <Redirect to="/admin/login" />
  );
  


export default App;