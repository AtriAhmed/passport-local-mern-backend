const session = require('express-session')

const MongoStore = require('connect-mongodb-session')(session)

try{
  const sessionStore = new MongoStore({uri: process.env.ATLAS_URI, collection :"sessions", databaseName:"passportMern"})
  module.exports = sessionStore
}catch(err){
  console.log(err)
}


