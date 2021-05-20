const mongoose = require('mongoose');
const { MONGO_URI_LOCAL, MONGO_URI_ATLAS, NODE_ENV } = process.env;

const connectDb = (mongoUri) =>

  mongoose
    .connect(mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });

NODE_ENV === "development"
  ? connectDb(MONGO_URI_LOCAL)
  : connectDb(MONGO_URI_ATLAS);

