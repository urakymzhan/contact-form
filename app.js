
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var path = require('path');

const CONNECTION_URL = "mongodb+srv://ulan13:Mongoparol2019@contact-form-whqru.mongodb.net/test?retryWrites=true&w=majority"
const DATABASE_NAME = "seytech";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Express.static(path.resolve(__dirname, 'public')));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("students-info");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


app.post("/student", (request, response) => {
    console.log(request.body);

    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
    response.sendFile(path.join(__dirname, './public', 'success.html'));
});
