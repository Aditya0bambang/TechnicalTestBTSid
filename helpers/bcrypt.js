const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  encryptPassword,
  compareHash,
};
