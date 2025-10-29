import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  oauthId: String,
  provider: String,
  displayName: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', UserSchema);
