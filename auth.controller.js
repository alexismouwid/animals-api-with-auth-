const express = require("express");
const bcrypt = require("bcrypt");
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const validateJwt = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

const findAndAssignUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (!user) {
      return res.status(401).end();
    }
    req.auth = user;
    next();
  } catch (e) {
    next(e);
  }
};

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser);

const Auth = {
  login: async (req, res) => {
    const { body } = req;
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        res.status(401).send("Usuario y/o contraseña inválida");
      } else {
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (isMatch) {
          const signed = signToken(user._id);
          res.status(200).send(signed);
        } else {
          res.status(401).send("Usuario y/o contraseña inválida");
        }
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Error en el servidor");
    }
  },
  register: async (req, res) => {
    const { body } = req;
    try {
      const isUser = await User.findOne({ email: body.email });
      if (isUser) {
        return res.status(409).json({ message: "El usuario ya existe" });
      } else {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(body.password, salt);
        const user = await User.create({
          email: body.email,
          password: hashed,
          salt,
        });
        const signed = signToken(user._id);
        res.send(signed);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = { Auth, isAuthenticated };
