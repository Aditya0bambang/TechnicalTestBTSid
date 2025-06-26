const jwt = require("jsonwebtoken");

function createToken(data) {
  return jwt.sign(data, process.env.secretKey);
}
function readPayLoad(token) {
  return jwt.verify(token, process.env.secretKey);
}

module.exports = {
  createToken,
  readPayLoad,
};
