module.exports.Account = require('./Account.js');
module.exports.Character = require('./Character.js');
module.exports.Team = require('./Team.js');
module.exports.PFP = require('./PFP.js');

const home = (req, res) => {
  res.render('home');
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

const nil = (req, res) => {
  res.json({ message: 'nothing' });
};

module.exports.home = home;
module.exports.notFound = notFound;
module.exports.nil = nil;
