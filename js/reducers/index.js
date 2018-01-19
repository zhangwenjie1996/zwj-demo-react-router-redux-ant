/**
 * Created by lipeishang on 17-4-28.
 */
import { combineReducers } from 'redux'
import counter from './counter'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    // counter 等价于counter:counter
    abc:counter // 等价于abc:counter(state.abc,action)
});
// 注意上面的写法和下面完全等价：(可以给它们设置不同的 key，或者调用不同的函数)
// export default function rootReducer(state = {}, action) {
//     export default function rootReducer(state = { }, action) {
//     console.log("rootReducerstate",state,state.counter)
//     return {
//         // counter: counter(state.counter, action),
//         abc: counter(state.abc, action),
//     //   todos: todos(state.todos, action)
//     }
//   }
//   const reducer = combineReducers({
//     a: doSomethingWithA,
//     b: processB,
//     c: c,
//     counter 
//   })
// function rootReducer(state = {}, action) {
//     return {
//       a: doSomethingWithA(state.a, action),
//       b: processB(state.b, action),
//       c: c(state.c, action),
//       counter: counter(state.counter, action)
//     }
//   }

export default rootReducer;