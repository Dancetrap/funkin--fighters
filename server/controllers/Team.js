const models = require('../models');
const CharacterModel = require('../models/Character');
const TeamModel = require('../models/Team');

const { Team } = models;

const makerPage = (req, res) => res.render('team');

const createNewTeam = async (req, res) => {
  const teamData = {
    team: [],
    owner: req.session.account._id,
    isAccepted: false,
  };

  try {
    const newTeam = new Team(teamData);
    await newTeam.save();
    return res.status(201).json({ team: newTeam.team, isAccepted: newTeam.isAccepted });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(200).json({ error: 'Team already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// Cannot set headers after they are sent to the client error
const addCharacterToTeam = async (req, res) => {
  const addTeam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  const teamMember = await CharacterModel.findById(req.body._id).exec();

  const existsInTeam = addTeam.team.filter((c) => c._id.equals(teamMember._id)).length !== 0;

  if (existsInTeam) {
    return res.status(400).json({ error: 'Character is already in team!' });
  }

  if (addTeam.team.length === 20) {
    return res.status(400).json({ error: 'Cannot add more team members' });
  }
  addTeam.team.push(req.body._id);

  if (addTeam.team.length === 20) {
    console.log('You filled out your team!');
    addTeam.isAccepted = true;
    addTeam.save();
    return res.status(201).json({ team: addTeam });
  }

  addTeam.save();
  return res.status(201).json({ team: addTeam });
};

// more bugs
//  Crashes whenever you get 20 team members
//  Sometimes it doesn't do the input at all
//  Talk to Austin about all of this

const removeCharacterFromTeam = async (req, res) => {
  const getTeam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  const teamMember = await CharacterModel.findById(req.body._id).exec();

  const existsInTeam = getTeam.team.filter((c) => c._id.equals(teamMember._id)).length !== 0;

  if (existsInTeam) {
    const index = getTeam.team.indexOf(teamMember._id);
    if (getTeam.team.length === 20) {
      getTeam.isAccepted = false;
      getTeam.team.splice(index, 1);
      getTeam.save();
      return res.status(201).json({ error: 'You are no longer accepted' });
    }
    getTeam.team.splice(index, 1);
    getTeam.save();
    return res.status(201).json({ error: 'Character has been removed' });
  }
  return res.status(400).json({ error: 'An unexpected error has occured!' });

  // const id = req.query.name;
  // const doc = await CharacterModel.findById(id).exec();

  // const existsInTeam = getTeam.team.filter((c) => c._id.equals(doc._id)).length !== 0;
  // // console.log(existsInTeam);
  // if (existsInTeam) {
  //   const index = getTeam.team.indexOf(doc._id);
  //   console.log(index);
  //   // console.log(getTeam.team);
  //   return res.status(200).json({ error: 'Character has been found' });
  // }

  // return res.status(200).json({ error: 'An unexpected error has occured!' });
};

const getTeam = (req, res) => TeamModel.findUsingOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }
  return res.json({ team: docs });
});

module.exports = {
  makerPage,
  getTeam,
  createNewTeam,
  addCharacterToTeam,
  removeCharacterFromTeam,
};
