import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import App from './App';
import Routes from '../routes/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../reducers/index.js';
import '../../css/form/form.less'
let store = createStore(reducer);
 
ReactDOM.render(<Provider store={store}>
<Routes history={browserHistory} />
</Provider>, document.getElementById('container'));