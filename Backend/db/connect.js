const mongoose = require('mongoose');
// Source - https://stackoverflow.com/a/79874273
// Posted by Vin
// Retrieved 2026-03-20, License - CC BY-SA 4.0

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = (url) => {
  return mongoose.connect(url);
}
module.exports = connectDB;