import Moment from 'moment'
import { extendMoment } from 'moment-range'

import Booking from '../models/booking'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

const moment = extendMoment(Moment)

// Create new booking => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  })

  res.status(200).json({
    success: true,
    booking,
  })
})

// Check room booking availablity => /api/bookings/check?roomId&checkInDate&checkOutDate
const checkRoomBookingsAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query

  checkInDate = new Date(checkInDate)
  checkOutDate = new Date(checkOutDate)

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  })

  // Check if there is any booking available
  let isAvailable

  if (bookings && bookings.length === 0) {
    isAvailable = true
  } else {
    isAvailable = false
  }

  res.status(200).json({
    success: true,
    isAvailable,
  })
})

// Check booked dates of a room => /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query

  const bookings = await Booking.find({ roomId })

  let bookedDates = []

  const timeDifference = moment().utcOffset() / 60

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(timeDifference, 'hours')
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      'hours'
    )

    const range = moment.range(moment(checkInDate), moment(checkOutDate))

    const dates = Array.from(range.by('day'))
    bookedDates = bookedDates.concat(dates)
  })

  res.status(200).json({
    success: true,
    bookedDates,
  })
})

// Get all bookings of current user => /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })

  res.status(200).json({
    success: true,
    bookings,
  })
})

// Get booking details => /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })

  res.status(200).json({
    success: true,
    booking,
  })
})

export {
  newBooking,
  checkRoomBookingsAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
}
