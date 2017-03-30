const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true},
  password: String
});

export default mongoose.model('User', UserSchema);
