require('dotenv').config();
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');

const universitiesRouter = require('./routes/universities');

const app = express();

// async errors
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.use('/api/v1/universities', universitiesRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connect MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
