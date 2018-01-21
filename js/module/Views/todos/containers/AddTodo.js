import React from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} style={{width:200,height:32}}/>
         <button type="submit" style={{width:80,height:32,background:"#1890ff",color:"white",marginLeft:20}}>
          添加任务
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo

