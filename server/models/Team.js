const mongoose = require('mongoose');
// const Character = require('./Character.js');

let TeamModel = {};

const MembersSchema = new mongoose.Schema({
  charID: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  index: {
    type: Number,
    min: 0,
  },
});

const TeamSchema = new mongoose.Schema({
  team: {
    // type: Array,
    type: [MembersSchema],
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
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TeamSchema.statics.toAPI = (doc) => ({
  team: doc.team,
  wins: doc.wins,
  losses: doc.losses,
});

// const team = await TeamSchema.findOne({owner: req.session.account._id})

TeamSchema.statics.findUsingOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };
  return TeamModel.findOne(search).select('team wins losses').lean().exec(callback);
};

TeamModel = mongoose.model('Team', TeamSchema);
module.exports = TeamModel;
