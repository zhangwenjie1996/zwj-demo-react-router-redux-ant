import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from '../component/counter/Counter'
import counter from '../reducers'

const store = createStore(counter)
const rootEl = document.getElementById('redux-demo')

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)
// store.subscribe()
// Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

// import { createStore } from 'redux';
// const store = createStore(reducer);

// store.subscribe(listener);
// 显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listener，就会实现 View 的自动渲染。 
// store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

// 执行监听 
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState()) //每次state变化 输出state
// );
// 发起一系列 action
// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// //解除监听
// unsubscribe();
