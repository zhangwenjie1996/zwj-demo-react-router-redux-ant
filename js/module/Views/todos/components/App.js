import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div id="Form" style={{
      width: 360,
    }}>
      <div className="form-block" style={{ background:"#f3f3f3"}}>
        <div className="form-demo-title">待办事项</div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
      </div>
    </div>
)

export default App
