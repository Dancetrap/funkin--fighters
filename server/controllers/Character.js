// const models = require('../models');

// // mongoose version of readSyncFile
const makerPage = (req, res) => res.render('app');
// const e = require('express');
// const { Character } = models;

const characters = require('../../hosted/characters.json');

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
      const character = {
        name: characters[k].name,
        origin: characters[k].origin,
        mod: characters[k].mod,
        img: characters[k].imageURL,
        flipX: characters[k].flip,
      };
      search.push(character);
      // return k;
      // const character = {
      //   name: req.body.name,
      //   image: req.body.image,
      // };
      // try {
      //   const addCharacter = new Character(character);
      //   await addCharacter.save();
      // } catch (err) {
      //   if (err.code === 11000) {
      //     return res.status(400).json({ error: 'Character already exists!' });
      //   }
      //   return res.status(400).json({ error: 'An error occured' });
      // }
    }
    return undefined;
    // return res.status(400).json({ error: 'No characters found' });
  });
  if (search.length !== 0) {
    // console.log(search);
    return res.status(200).json({ list: search });
  }
  return res.status(404).json({ list: [], error: 'No characters found' });
};

const searchTest = async (req, res) => {
  // I need to use req.query
  console.log(req.query);
  return res.status(200).json({ message: 'Success' });
};

module.exports = {
  makerPage,
  findCharacters,
  searchTest,
};
