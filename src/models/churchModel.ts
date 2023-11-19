import mongoose from 'mongoose';

const churchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'La iglesia debe tener un nombre'],
  },
  address: {
    type: String,
    required: [true, 'La iglesia debe tener una dirección'],
  },
  city: String,
  state: String,
  zip: String,
  street: String,
  phone: [String],
  email: [String],
  pastor: [String],
  pastorPhone: [String],
  pastorEmail: [String],
  url: String,
});

const model = mongoose.model('Church', churchSchema);

export default model;
