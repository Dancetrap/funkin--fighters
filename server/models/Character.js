const mongoose = require('mongoose');

let CharacterModel = {};

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  flip: {
    type: Boolean,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CharacterSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  image: doc.image,
});

CharacterSchema.statics.findByName = (charName, callback) => {
  const search = {
    name: charName,
  };
  return CharacterSchema.find(search).select('name image').lean().exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);
module.exports = CharacterModel;
