import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import App from './App';
import Routes from '../routes/index';

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('container'));