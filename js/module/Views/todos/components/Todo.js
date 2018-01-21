import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
  <li
    style={{
      border:"1px solid #d8d8d8",
      borderRadius:4,
      padding:5,
      marginBottom:2,
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
    <span style={{float:"right"}} onClick={onClick}>删除</span>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
