const models = require('../models');
// const AccountModel = require('../models/Account');

const { Account } = models;

// Opens profile page
const profilePage = (req, res) => {
  res.render('profile', { username: req.session.account.username });
};

// Opens login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/home' });
  });
};

// Ask how to make it go into other page if already logged in! Done and done
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({
      username, password: hash, picture: '/assets/img/profileIcon.png', premium: false, header: '#55acee', body: '#ffffff',
    });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/home' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const findAllUsers = (req, res) => {
  Account.find({}, (err, users) => {
    res.send(users);
  });
};

// A lot of these are self-explanatory
const getYourUsername = (req, res) => res.json({ username: req.session.account.username });

const getUsername = (req, res) => {
  Account.findById(req.query.id).exec((err, doc) => {
    if (err) return res.status(400).json({ error: 'An error occurred!' });
    return res.json({ username: doc.username });
  });
};

// Gets your account
const getAccount = async (req, res) => {
  const acc = await Account.findOne({ username: req.session.account.username }).select('-password').exec();
  return res.json({ account: acc });
};

// Gets the account of another user
const getAccountThroughId = (req, res) => {
  Account.findById(req.query.id).select('-password').exec((err, docs) => {
    if (err) return res.status(400).json({ error: 'An error occurred!' });
    return res.json({ account: docs });
  });
};

// This turns on premium mode
const setPreminumMode = async (req, res) => {
  const yourAccount = await Account.findOne({ username: req.session.account.username }).exec();
  if (!yourAccount.premium) {
    yourAccount.premium = true;
    yourAccount.save();
    return res.json({ message: 'You are now a premium member' });
  }
  return res.json({ message: 'Premium has already been set ' });
};

const preminumSettings = async (req, res) => {
  const yourAccount = await Account.findOne({ username: req.session.account.username }).exec();
  yourAccount.header = req.body.header;
  yourAccount.body = req.body.body;
  yourAccount.save();
  return res.json({ message: 'Colors have been set', head: yourAccount.header, body: yourAccount.body });
};

module.exports = {
  loginPage,
  profilePage,
  login,
  logout,
  signup,
  getToken,
  findAllUsers,
  getYourUsername,
  getUsername,
  getAccount,
  getAccountThroughId,
  setPreminumMode,
  preminumSettings,
};
