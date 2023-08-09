
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  login: { type: String, required: true, minlength: 5 },
  password: { type: String, required: true, minlength: 5 },
});
const User = mongoose.model("User", userSchema);
export default User;
