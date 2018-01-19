/**
 * Created by lipeishang on 17-4-18.
 */
export default function counter(state = 99, action) {
    console.log("counter1111",state )
    
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return state + 1;
        case 'DECREMENT_COUNTER':
            return state - 1;
        default:
            return state
    }
    
};