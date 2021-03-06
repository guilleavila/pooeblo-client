import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProviderWrapper } from './context/auth.context';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { MessageProviderWrapper } from './context/userMessage.context';

ReactDOM.render(
  <Router>
    <AuthProviderWrapper>
      <MessageProviderWrapper>
        <App />
      </MessageProviderWrapper>
    </AuthProviderWrapper>
  </Router>,
  document.getElementById('root')
);