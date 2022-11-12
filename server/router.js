const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);

  app.get('/team', mid.requiresLogin, controllers.Team.makerPage);
  app.get('/game', mid.requiresLogin, controllers.Team.gamePage);

  app.get('/searchCharacters', mid.requiresLogin, controllers.Character.findCharacters);
  app.get('/getCharacter', mid.requiresLogin, controllers.Character.getCharacter);
  app.post('/load', mid.requiresLogin, controllers.Character.createCharacterModels);
  app.post('/loadTeam', mid.requiresLogin, controllers.Team.createNewTeam);
  app.get('/getTeam', mid.requiresLogin, controllers.Team.getTeam);

  app.post('/add', mid.requiresLogin, controllers.Team.addCharacterToTeam);
  app.post('/remove', mid.requiresLogin, controllers.Team.removeCharacterFromTeam);

  // app.get('/remove', mid.requiresLogin, controllers.Team.removeCharacterFromTeam);
  // app.post('/load', mid.requiresLogin, controllers.Character.testModels);

  // app.get('/searchCharacters', mid.requiresLogin, controllers.Character.searchTest);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
