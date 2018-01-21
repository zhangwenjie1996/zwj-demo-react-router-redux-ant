import React from 'react'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers/index.js';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
let store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <div id="Form" style={{
      width: 360,
    }}>
      <div className="form-block">
        <div className="form-demo-title">待办事项</div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
      </div>
    </div>
  </Provider>

)

export default App
