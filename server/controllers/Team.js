const models = require('../models');
const TeamModel = require('../models/Domo');

const { Team } = models;

const makerPage = (req, res) => res.render('team');

const createNewTeam = async (req, res) => {

  const teamData = {
      team: [],
      owner: req.session.account._id,
    };
  
    try {
      const newTeam = new Team(teamData);
      await newTeam.save();
      return res.status(201).json({ team: newTeam.team });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Team already exists!' });
      }
      return res.status(400).json({ error: 'An error occured' });
    }
};

const addCharacterToTeam = async (req, res) => {
  const team = TeamModel.findOne({ owner: req.session.account._id }).exec();
  console.log(team);
  return team;
}

const getTeam = (req, res) => TeamModel.findByOwner(req.session.account._id, (err, docs) => {
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
