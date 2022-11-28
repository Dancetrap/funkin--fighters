const models = require('../models');

// // mongoose version of readSyncFile
const makerPage = (req, res) => res.render('app');
// const e = require('express');
const { Character } = models;

const characters = require('../../hosted/characters.json');
const CharacterModel = require('../models/Character');
// const { values } = require('underscore');

const createCharacterModels = async (req, res) => {
  const search = [];
  const newBatch = [];

  const doc = await CharacterModel.findOne({}).exec();
  // console.log(doc);
  const list = JSON.parse(JSON.stringify(characters));
  // console.log(Object.keys(list).length);
  if (!doc) {
    Object.keys(list).forEach((c) => {
      const character = {
        name: list[c].name,
        // origin: characters[k].origin,
        // mod: characters[k].mod,
        image: list[c].imageURL,
        flip: list[c].flip,
      };
      const addCharacter = new Character(character);
      search.push(addCharacter.save());
    });

    return Promise.all(search).then(() => res.status(200).json({ message: 'success' })).catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    });
  }
  const docs = await CharacterModel.find().exec();
  // console.log(docs.length);
  Object.keys(list).forEach((c) => {
    // console.log(list[c].name);
    let exist = true;
    docs.forEach((d) => {
      if (d.name === list[c].name) {
        exist = false;
      }
    });
    if (exist) {
      const character = {
        name: list[c].name,
        // origin: characters[k].origin,
        // mod: characters[k].mod,
        image: list[c].imageURL,
        flip: list[c].flip,
      };
      // console.log(character);
      const addCharacter = new Character(character);
      newBatch.push(addCharacter.save());
    }
    // return res.status(200).json({ message: 'No new characters' });
  });

  if (newBatch.length !== 0) {
    return Promise.all(newBatch).then(() => res.status(200).json({ message: 'success' })).catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    });
  }
  // console.log('No new characters');
  return res.status(200).json({ message: 'Characters have already been loaded' });

  // return res.status(200).json({ message: 'Characters have already been loaded' });
};

const findCharacters = async (req, res) => {
  let docs;

  try {
    docs = await CharacterModel.find({ name: { $regex: req.query.name, $options: 'i' } }).exec();
  } catch (err) {
    // Send back 500 err
    return res.status(500).json({ error: 'An unexpected error has occured' });
  }
  // console.log(docs);
  // console.log(req.query.name);

  if (req.query.name === '') {
    return res.status(204);
  }

  if (!docs || docs.length === 0) {
    // No characters found
    return res.status(404).json({ error: 'No characters have been found' });
  }

  return res.json(docs);
};

const getCharacter = async (req, res) => {
  const id = req.query.name;
  const doc = await CharacterModel.findById(id).exec();

  if (doc) {
    return res.status(200).json({ character: doc });
  }
  return res.status(404).json({ error: 'Character not found' });
};

module.exports = {
  makerPage,
  findCharacters,
  createCharacterModels,
  getCharacter,
};
