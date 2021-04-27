import { combineReducers } from 'redux'

import singleJobItemReducer from './singleProject/singleProjectReducer'

const RootReducer = combineReducers({
    singleProject: singleJobItemReducer
})

export default RootReducer