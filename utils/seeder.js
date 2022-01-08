const mongoose = require('mongoose')

const Room = require('../models/room')
const rooms = require('../data/rooms')

mongoose.connect(
  'mongodb+srv://mh77-1234:mh77-1234@mh77-media.wuupo.mongodb.net/bookit?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const seedRooms = async () => {
  try {
    await Room.deleteMany()
    console.log('Room are deleted!')

    await Room.insertMany(rooms)
    console.log('All Rooms are added.')

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedRooms()
