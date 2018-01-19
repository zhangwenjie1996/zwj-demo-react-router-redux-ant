import React, {Component} from 'react'

class Counter extends Component {
    render() {
        //从组件的props属性中导入increment decrement 方法(mapDispatchToProps)和一个变量dd(mapStateToProps)
        const {increment, decrement, dd} = this.props;
        //渲染组件，包括一个数字，四个按钮
        return (
            <p>
                Clicked: {dd} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
            </p>
        )
    }
}

export default Counter

// import React, {Component} from 'react'

// // 若connect  不传该参数mapDispatchToProps  直接用传过来的属性dispatch 进行行为的执行
// class Counter extends Component {
//     render() {
//         //从组件的props属性中导入四个方法和一个变量
//         const { dispatch, dd} = this.props;
//         //渲染组件，包括一个数字，四个按钮
//         return (
//             <p>
//                 Clicked: {dd} times
//                 {' '}
//                 <button onClick={()=>dispatch({
//         type: 'INCREMENT_COUNTER',
//     })}>+</button>
//                 {' '}
//                 <button onClick={()=>dispatch({
//         type: 'DECREMENT_COUNTER',
//     })}>-</button>
//                 {' '}
//             </p>
//         )
//     }
// }

// export default Counter
