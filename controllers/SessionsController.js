const User = require("../models/user");
const passport = require("passport");
const viewPath = "sessions";

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: "Login",
  });
};

// Step 1: Create an action that will authenticate the user using Passport
exports.create = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/datas",
    successFlash: "You were successfully logged in.",
    failureRedirect: "/login",
    failureFlash: "Invalid credentials",
  })(req, res, next);
};

// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash("success", "You were logged out successfully.");
  res.redirect("/");
};
