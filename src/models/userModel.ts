import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  churchId: {
      type: String,
      required: [true, 'El hermano debe pertenecer a una iglesia'],
  },
  name: {
      type: String,
      required: [true, 'El hermano debe tener un nombre'],
  },
  email: String,
  phone: {
      type: String,
      required: [true, 'El hermano debe tener un número de teléfono'],
      unique: [true, 'El número de teléfono ya existe'],
  },
  address: String,
  city: String,
  state: String,
  zip: String,
  relatives: Array,
  notes: Array,
  birthday: Date,
  weddingAnniversary: Date,
  conversionAnniversary: Date,
});

const model = mongoose.model('User', userSchema);

export default model;