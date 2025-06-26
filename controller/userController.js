const { encryptPassword, compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../model/userModel");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashPassword = encryptPassword(password);
      const newUser = new User({
        username,
        email,
        password: hashPassword,
      });
      const validateError = newUser.validateSync();
      if (validateError) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid data",
        });
      }
      await newUser.save();
      return res.status(201).json({
        statusCode: 201,
        message: "User registered",
        data: {
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async requestToken(req, res) {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ username });
      if (!foundUser) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }
      const checkPassword = compareHash(password, foundUser.password);
      if (!checkPassword) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }
      const payload = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        statusCode: 200,
        message: "Login success",
        access_token: access_token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
