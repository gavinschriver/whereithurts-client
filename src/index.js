import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import WhereItHurts from "./components/WhereItHurts"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WhereItHurts />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
