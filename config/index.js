const dotenv = require('dotenv');
dotenv.config();

//this will load environment variables into a structured and easy access variables
module.exports = {
  port: process.env.PORT,
  databaseURI: process.env.MONGO_URI,
}