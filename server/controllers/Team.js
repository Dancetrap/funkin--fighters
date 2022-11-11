const models = require('../models');
const TeamModel = require('../models/Domo');

const { Team } = models;

const makerPage = (req, res) => res.render('team');

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
};
