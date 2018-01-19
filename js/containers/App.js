import { connect } from 'react-redux'
import Counter from '../component/Counter'
import actions from '../actions/counter';

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    console.log("mapStateToProps",state)
    return {
        dd: state.abc
        // dd: state.abc
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("ownProps",ownProps)
    return {
        increment: (...args) => dispatch(actions.increment(...args)),
        decrement: (...args) => dispatch(actions.decrement(...args))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

