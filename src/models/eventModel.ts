import mongoose from 'mongoose';

const attendantSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  church: String,
  state: String,
  city: String,
  phone: String,
  mail: String,
  accompanying: Number,
  hosting: Boolean,
});

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El evento debe tener un nombre'],
    unique: [true, 'El evento debe tener nombre único'],
  },
  address: {
    type: String,
    required: [true, 'El evento debe tener una dirección'],
  },
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  attendants: [attendantSchema],
});

const model = mongoose.model('event', eventSchema);

export default model;
