import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: [true, 'La publicación debe tener una fecha'],
  },
  title: {
    type: String,
    required: [true, 'La publicación debe tener un título'],
  },
  content: {
        type: String,
        required: [true, 'La publicación debe tener contenido'],
  }

});

const model = mongoose.model('Post', postSchema);

export default model;