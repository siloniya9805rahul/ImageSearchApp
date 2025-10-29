import { Schema, model } from 'mongoose';

const SearchSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  term: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now }
});

export default model('Search', SearchSchema);
