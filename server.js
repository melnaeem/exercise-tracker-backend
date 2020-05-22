const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// create express app
const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .catch(err => console.log('DB connection Error: ' + err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Mongoose DB connect successfully`);
});

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
