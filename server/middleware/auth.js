const { User } = require('../models/User');

let auth = (req, res, next) => {
  console.log('cookie:',req.cookies)
  let token = req.cookies.w_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        isAuth: false,
        error: true
      });
    }
    console.log('Suceess')
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
