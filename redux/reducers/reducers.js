import { combineReducers } from 'redux'

import {
  allRoomsReducer,
  roomDetailsReducer,
  newReviewReducer,
  checkReviewReducer,
  newRoomReducer,
  roomReducer,
  roomReviewsReducer,
  reviewReducer,
} from './roomReducers'
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './userReducers'
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from './bookingReducers'

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
})

export default reducers
