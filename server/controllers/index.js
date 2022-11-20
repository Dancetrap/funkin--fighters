module.exports.Account = require('./Account.js');
module.exports.Domo = require('./Domo.js');
module.exports.Character = require('./Character.js');
module.exports.Team = require('./Team.js');

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports.notFound = notFound;
