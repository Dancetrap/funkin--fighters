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
      return res.status(400).json({ error: 'Team already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// Cannot set headers after they are sent to the client error
const addCharacterToTeam = async (req, res) => {
  const addTeam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  const teamMember = await CharacterModel.findById(req.body._id).exec();

  const existsInTeam = addTeam.team.filter((c) => c.name === teamMember.name).length !== 0;

  console.log(existsInTeam);
  if (existsInTeam) {
    return res.status(400).json({ error: 'Character is already in team!' });
  }

  addTeam.team.push(req.body._id);
  addTeam.save();
  return res.status(201).json({ team: addTeam });
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
};
