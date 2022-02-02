import { combineReducers } from 'redux'

import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './userReducers'

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
})

export default reducers
