require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );