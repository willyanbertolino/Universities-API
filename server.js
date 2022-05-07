require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const universitiesRouter = require('./routes/universities');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/universities', universitiesRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
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
