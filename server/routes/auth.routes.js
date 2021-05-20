const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const SALT_ROUNDS = 10;


const User = require("../models/User.model");


authRoutes.post("/login", (req, res, next) => {
 
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {

      res.status(401).json(failureDetails);
      return;
    }

    
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      const { _id, email, createdAt, updatedAt } = theUser;
      
      res.status(200).json({ _id, email, createdAt, updatedAt });
    });
  })(req, res, next);
});


authRoutes.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Provide all fields" });
    return;
  }

  const emailFormatRegex = /^\S+@\S+\.\S+$/;
  if (!emailFormatRegex.test(email)) {
    res.status(200).json({ message: "Email needs to be similar to email@email.com" });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).json({
      message:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }



  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        email,
        password: hashedPassword,
      });
    })
    .then((userFromDB) => {

      const { _id, email, createdAt, updatedAt } = userFromDB;

      res.status(200).json({ _id, email, createdAt, updatedAt });
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(200).json({
          errorMessage:
            "Email needs to be unique. Email has already been used.",
        });
      } else {
        next(error);
      }
    });
});



authRoutes.post("/logout", (req, res, next) => {
  
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
 
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;