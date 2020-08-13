const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          done(null, false, { message: "User not found." });
        } else {
          if (user.password === password) done(null, user);
          else {
            done(null, false, { message: "Incorrect password." });
          }
        }
      })
      .catch((error) => done(error));
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
module.exports = passport;
