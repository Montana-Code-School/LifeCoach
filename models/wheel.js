const mongoose = require('mongoose');

const WheelSchema = new mongoose.Schema({
  date: Date,
  segs: [{
    value: String,
    score: Number
  }],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model('Wheel', WheelSchema);
