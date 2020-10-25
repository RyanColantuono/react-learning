import React from 'react';
import App from './components/App';
import "./css/custom.css";
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

render(
    <BrowserRouter>
      <Route component={App}/>
    </BrowserRouter>,
    document.querySelector('#app-container')
  )