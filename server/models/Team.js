const mongoose = require('mongoose');
// const Character = require('./Character.js');

let TeamModel = {};

const TeamSchema = new mongoose.Schema({
  team: {
    // type: Array,
    type: [mongoose.Schema.ObjectId],
  },
  // limit: {
  //   type: Number,
  //   max: 20,
  // },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
    ref: 'Account',
  },
  isAccepted: {
    type: Boolean,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TeamSchema.statics.toAPI = (doc) => ({
  team: doc.team,
});

TeamSchema.statics.findUsingOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };
  return TeamModel.findOne(search).select('team').lean().exec(callback);
};

TeamModel = mongoose.model('Team', TeamSchema);
module.exports = TeamModel;
