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
  for (let k = 0; k < characters.length; k++) {
    const character = {
      name: characters[k].name,
      // origin: characters[k].origin,
      // mod: characters[k].mod,
      image: characters[k].imageURL,
      flip: characters[k].flip,
    };
    const addCharacter = new Character(character);
    search.push(addCharacter.save());
  }

  return Promise.all(search).then(() =>  {
    console.log(search);
    return res.status(200).json({message: 'success'});
  }).catch(err => {
    return res.status(500).json({error: 'Something went wrong'});
  });
};

const findCharacters = async (req, res) => {
  const search = [];
  if (!req.query.name) {
    return res.status(204);
  }

  const split = req.query.name.split('');
  // empty all of list
  Object.keys(characters).forEach(async (k) => {
    let exist = true;
    const name = k.split('');
    for (let i = 0; i < req.query.name.length; i++) {
      if (exist) {
        if (name[i] !== split[i]) {
          exist = false;
          break;
        }
      }
    }
    if (exist) {
      search.push(k);
    }
    return undefined;
    // return res.status(400).json({ error: 'No characters found' });
  });
  console.log(search);
  if (search.length !== 0) {
    search.forEach((c) => {
      // CharacterModel.findByName(c, (err, doc) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(400).json({ error: 'An error occurred!' });
      //   }
      //   console.log(doc);
      //   return doc;
      // });
      CharacterModel.findOne({ name: c }).exec((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: 'An error occurred!' });
        }
        console.log(doc);
        return doc;
      });
    });

    // return res.status(200).json({ list: search });
  }
  return res.status(404).json({ list: [], error: 'No characters found' });
};

module.exports = {
  makerPage,
  findCharacters,
  createCharacterModels,
};
