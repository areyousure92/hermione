import mongoose from 'mongoose';

const DeckSchema = new mongoose.Schema({
  deckname: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  allCards: {
    type: Number,
    default: 0,
  },
  todaysCards: {
    type: Number,
    default: 0,
  },
  repeatedCards: {
    type: Number,
    default: 0,
  },
  newCards: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model('Deck', DeckSchema);

