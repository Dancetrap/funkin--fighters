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
  const addteam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  console.log(addteam);
  let exist = false;
  console.log(req.body._id);
  if (addteam.team.length !== 0) {
    const teamMember = await CharacterModel.findById(req.body._id).exec();
    console.log('My old team member');
    console.log(teamMember.name);
    addteam.team.forEach(async (c) => {
      const others = await CharacterModel.findById(c).exec();
      console.log(others.name);
      console.log(teamMember.name === others.name);
      if (teamMember.name === others.name) {
        exist = true;
      }
      return undefined;
    });

    // if (exist) {
    //   return res.status(400).json({ error: 'Character already exists' });
    // }

    if (addteam.team.length <= 20 && !exist) {
      addteam.team.push(req.body._id);
      addteam.save();
      // console.log(addteam);
      return res.status(201).json({ team: addteam });
    }
    return res.status(400).json({ error: 'Character already exists' });
  } else {
    const teamMember = await CharacterModel.findById(req.body._id).exec();
    console.log('My old team member');
    console.log(teamMember.name);

    addteam.team.push(req.body._id);
    addteam.save();
    // console.log(addteam);
    return res.status(201).json({ team: addteam });
  }
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
