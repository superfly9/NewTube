const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    console.log('for Logout User',user,'Token:',token)
    if (!user) {
      return res.json({
        isAuth: false,
        error: true
      });
    }
    req.token = token;
    req.user = user;
    console.log('req.user:',req.user)
    next();
  });
};

module.exports = { auth };
