// const { rest } = require('underscore');
const models = require('../models');
const CharacterModel = require('../models/Character');
const TeamModel = require('../models/Team');

const { Team } = models;

const makerPage = (req, res) => {
  const pageName = `${req.session.account.username}'s Team`;
  return res.render('team', { title: pageName });
};
const gamePage = (req, res) => res.render('game');

const createNewTeam = async (req, res) => {
  const teamData = {
    team: [],
    owner: req.session.account._id,
    isAccepted: false,
    wins: 0,
    losses: 0,
  };

  try {
    const newTeam = new Team(teamData);
    await newTeam.save();
    return res.status(201).json({
      team: newTeam.team, isAccepted: newTeam.isAccepted, wins: 0, losses: 0,
    });
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

  const existsInTeam = addTeam.team.filter((c) => c.charID.equals(teamMember._id)).length !== 0;

  if (existsInTeam) {
    return res.status(400).json({ error: 'Character is already in team!' });
  }

  // console.log(teamMember);

  if (addTeam.team.length === 20) {
    return res.status(400).json({ error: 'Cannot add more team members' });
  }
  addTeam.team.push({ charID: req.body._id, index: addTeam.team.length });
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

  const existsInTeam = getTeam.team.filter((c) => c.charID.equals(teamMember._id)).length !== 0;

  if (existsInTeam) {
    const index = getTeam.team.indexOf(teamMember._id);
    // console.log(teamMember.name);
    if (getTeam.team.length === 20) {
      getTeam.isAccepted = false;
      getTeam.team.splice(index, 1);
      getTeam.save();
      return res.status(200).json({ message: 'You are no longer accepted' });
    }
    getTeam.team.splice(index, 1);
    getTeam.save();
    return res.status(200).json({ message: 'Character has been removed' });
  }
  return res.status(400).json({ error: 'An unexpected error has occured!' });
};

const getYourTeam = (req, res) => {
  TeamModel.findUsingOwner(req.session.account._id, async (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' });
    }

    try {
      // let team = [];
      // console.log(chars.length);
      const teamIDs = docs.team.map((c) => c.charID);
      // console.log(teamIDs);
      // console.log(docs.team[0].index);
      // const team = [];
      // await teamIDs.forEach(async (id) => {
      //   // console.log(id);
      //   const t = await CharacterModel.find({ _id: id }).exec();
      //   team.push(t);
      //   // console.log(team);
      // });

      // const team = teamIDs.map(async (c) => {
      //   const t = await CharacterModel.find({ _id: c }).exec();
      //   return t;
      // });

      // console.log(team);
      // return res.status(400).json({ error: "An unexpected error occured" });
      const team = await CharacterModel.find({ _id: { $in: teamIDs } }).exec();
      // console.log(team);
      // const sort = team.sort((a, b) => docs.team[a].index - docs.team[b].index);
      // console.log(sort);
      // console.log(team[0]._id);
      // console.log(teamIDs[0]);
      // console.log(team[0]._id === teamIDs[0]);
      // console.log(team[0]._id.equals(teamIDs[0]));
      // console.log(teamIDs.valueOf(team[0]._id));
      // .indexOf(idYourAreLookingFor);

      // console.log(team.map((c) => c._id));
      // console.log(team.length);
      // team.forEach((t) => console.log(teamIDs[0]));
      // teamIDs.forEach((c) => console.log(team.indexOf(c)));

      // sort team by team ID index

      // team.forEach((t) => console.log(t._id));
      // team.forEach((t) => {
      // console.log(t);
      // console.log(teamIDs.indexOf(t._id));
      // console.log(teamIDs.indexOf('638667985a6b0c43a8e9cfb0'));
      // console.log(teamIDs[team[t]]);
      // });

      // for (let i = 0; i < team.length; i++) {
      // console.log(team[i]._id);
      // console.log(teamIDs[i]);

      // console.log(teamIDs.contains(team[i]._id));

      // console.log(teamIDs[i].equals(team[i]._id));
      // }
      // team.forEach((t) => console.log(teamIDs.includes(t._id)));

      // team.sort((a, b) => teamIDs.indexOf(b._id) - teamIDs.indexOf(a._id));
      // console.log(teamIDs.indexOf(a._id));
      // console.log(a._id);
      // console.log(team);

      return res.json(team);

      // return Promise.all(team).then(() => {
      //   console.log(team);
      //   res.status(200).json(team);
      // });

      // return Promise.all(team).then(() => {
      //   console.log(team);
      //   res.status(200).json(team);
      // }).catch((er) => {
      //   console.log(er);
      //   return res.status(500).json({ error: 'Something went wrong' });
      // });
    } catch (err2) {
      return res.status(200).json({ error: true });
    }
  });
};

// const getYourTeam = async (req, res) => {
//   const team = await TeamModel.findOne({ owner: req.session.account._id });
//   team.team[0].slot = 5;
//   team.team.sort((a,b))
// }

const getOpponentTeam = async (req, res) => {
  const doc = await TeamModel.findOne({ owner: req.query.team }).exec();
  if (doc) {
    return res.json({ team: doc });
  }
  return res.status(400).json({ error: 'An error has occured' });
};

const findAccounts = async (req, res) => {
  const teams = await TeamModel.find({
    isAccepted: true,
    owner: { $ne: req.session.account._id },
  }).exec();

  if (teams) {
    return res.json({ accounts: teams });
  }

  return res.status(400).json({ error: 'No accounts found' });
};

const addWin = async (req, res) => {
  const getTeam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  getTeam.wins += 1;
  getTeam.save();
  return res.status(201).json({ error: 'You Win!' });
};

const addLoss = async (req, res) => {
  const getTeam = await TeamModel.findOne({ owner: req.session.account._id }).exec();
  getTeam.losses += 1;
  getTeam.save();
  return res.status(201).json({ error: 'You Win!' });
};

const getWinsAndLosses = async (req, res) => {
  TeamModel.findUsingOwner(req.session.account._id, async (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' });
    }

    return res.json({ wins: docs.wins, losses: docs.losses });
  });
};

const generateCharacters = async (req, res) => {
  let rteam;
  try {
    rteam = await CharacterModel.aggregate().sample(20).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'error getting random team' });
  }

  if (!rteam) {
    return res.status(500).json({ error: 'no team generated' });
  }

  return res.json({ team: rteam });
};

module.exports = {
  makerPage,
  gamePage,
  findAccounts,
  getYourTeam,
  getOpponentTeam,
  createNewTeam,
  addCharacterToTeam,
  removeCharacterFromTeam,
  addWin,
  addLoss,
  getWinsAndLosses,
  generateCharacters,
};
