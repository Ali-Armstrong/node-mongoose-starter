const dotenv = require('dotenv');
dotenv.config();

//this will load environment variables into a structured and easy access variables
module.exports = {
  port: process.env.PORT,
  env: process.env.ZI_ENV,
  databaseURI: process.env.MONGO_URI,
  auth: {
    issuer: process.env.AUTH_ISS,
    audience: process.env.AUTH_AUD,
    expiresIn: 	"12h",
    algorithm: 	"RS256",
    resetURI: "https://meetin.com/auth/reset" //ui end point
  }
}