# Universities-API

## MongoDB connection

create an environment variable with name MONGO_URI and insert the secret connection key of the database.

## Insert/Reset database

To populate the database or reset to initial populated state run the script: node populate_db.js

### Expeceted POST request example

To create a new university you should input data as:
{
"alpha_two_code": "BR",
"web_pages": [
"http://www.baraodemaua.br/"
],
"name": "Centro Universitário Barao de Maua",
"country": "Brazil",
"domains": [
"baraodemaua.br"
],
"state_province": null
}
