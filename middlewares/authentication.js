const { readPayLoad } = require("../helpers/jwt");
const User = require("../model/userModel");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    const [type, token] = authorization?.split(" ") ?? [];
    const access_token = type.toLowerCase() === "bearer" ? token : undefined;
    const payload = readPayLoad(access_token);
    const foundUser = await User.findById(payload.id);
    if (!foundUser) {
      throw new Error("User not found");
    }
    req.currentUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authentication };
