import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  q: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  deck: { type: mongoose.Schema.ObjectId, ref: 'Deck' },
  lastdate: {
    type: Date,
    default: Date.now,
  },
  nextdate: {
    type: Date,
    default: Date.now,
  },
  interval: {
    type: Number,
    default: 0,
  },
  repeated: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Card', CardSchema);

