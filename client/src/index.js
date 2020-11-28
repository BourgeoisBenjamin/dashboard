import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/';
} else {
    axios.defaults.baseURL = 'http://localhost:8080/';
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

