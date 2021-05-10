import { combineReducers } from 'redux'

import singleJobItemReducer from './singleProject/singleProjectReducer'
import singleOrganizationReducer from './singleOrganization/singleOrganizationReducer'

const RootReducer = combineReducers({
    singleProject: singleJobItemReducer,
    singleOrganization: singleOrganizationReducer
})

export default RootReducer