require('dotenv').config();
const fetch = require('node-fetch');
const mongoose = require('mongoose');

const Universities = require('./models/universities');

const universitiesBaseURL = 'http://universities.hipolabs.com/search?country=';
const universitiesCountryList = [
  'argentina',
  'brazil',
  'chile',
  'colombia',
  'paraguay',
  'peru',
  'suriname',
  'uruguay',
];
let universitiesList = [];

universitiesCountryList.map(async (country) => {
  try {
    const response = await fetch(universitiesBaseURL + country);
    const data = await response.json();
    universitiesList = [...data];
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    // connect MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // reset database
    await Universities.deleteMany();
    // Insert data
    await Universities.insertMany(universitiesList);

    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
