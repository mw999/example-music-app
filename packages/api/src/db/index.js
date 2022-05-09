const knexfile = require("./knexfile");
const Models = require("./Models/index");

module.exports = {
  knexfile,
  ...Models,
};
