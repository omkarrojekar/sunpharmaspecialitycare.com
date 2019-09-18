import 'core-js/stable';
import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/assets/plugins/morris/morris.css'
import '../src/assets/assets/plugins/bootstrap-sweetalert/sweet-alert.css'
import '../src/assets/assets/css/icons.css'
import '../src/assets/assets/css/style.css'
import '../src/assets/assets/plugins/datatables/dataTables.bootstrap4.min.css'
import '../src/assets/assets/plugins/datatables/buttons.bootstrap4.min.css'
import '../src/assets/assets/plugins/datatables/responsive.bootstrap4.min.css'

ReactDOM.render( <App / > , document.getElementById('root'));


serviceWorker.unregister();
