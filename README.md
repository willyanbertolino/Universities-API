# Universities-API

## MongoDB connection

### deploy using MongoDB cloud

create an environment variable with name MONGO_URI and insert the secret connection key of the database.
Ex.
MONGO_URI = mongodb+srv://<UserName>:<Password>@cluster0.qsplt.mongodb.net/UniversityAPI?retryWrites=true&w=majority

### deploy using MongoDB compass

Connect MongoDB Compass to localhost.

## Insert/Reset database

To populate the database or reset to initial populated state run the script: node populate.js

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

### Find all universities

This request returns 20 universities per page. Require a page query number.

(siteURL)/api/v1/universities/?page=1

### Find a university by id

Find an specific university. Enter the id params at the end of url.
(siteURL)/api/v1/universities/:id

example:
(siteURL)/api/v1/universities/6276abc8b1b58e8a912e4ed6

### Update a university by id

Update an specific university. Expect the id params at the end of url and ONE or MORE of the fields: {name, web_pages, domains}

Example
url:
(siteURL)/api/v1/universities/6276abc8b1b58e8a912e4ed6

body data:
{
"web_pages": [
"http://www.baraodemaua.br/"
],
"name": "Centro Universitário Barao de Maua",
"domains": [
"baraodemaua.br"
]
}

### Delete university

Delete an specific university. Enter the id params at the end of url.
(siteURL)/api/v1/universities/:id

example:
(siteURL)/api/v1/universities/6276abc8b1b58e8a912e4ed6
