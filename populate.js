const mongoose = require('mongoose');
const Universities = require('./models/Universities');
const fetch = require('node-fetch');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to mongoDB');
} catch (error) {
  console.log(error);
}

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
let urls = [];
let fetched = 0;

universitiesCountryList.map((country) =>
  urls.push(universitiesBaseURL + country)
);

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    resultData = [...json];
    fetched += resultData.length;
    return resultData;
  } catch (error) {
    console.log(`Não foi possível carregar os dados de ${url}`);
    console.log(error);
  }
};

const saveUniversities = async () => {
  try {
    // reset database
    await Universities.deleteMany();

    if (urls) {
      for (url of urls) {
        const data = await fetchData(url);

        // Insert data
        await Universities.insertMany(data);
        console.log(`${url} - salvo com sucesso.`);
      }
    }
    const totalSaved = await Universities.find();

    console.log(`Salvos ${totalSaved.length} de ${fetched} com sucesso`);
    await mongoose.disconnect();
    console.log('Concluido.');
  } catch (error) {
    console.log(error);
  }
};

saveUniversities();
