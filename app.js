
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var path = require('path');

const CONNECTION_URL = "mongodb+srv://<username>:<password>@contact-form-whqru.mongodb.net/test?retryWrites=true&w=majority"
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
    });
});

app.post("/student", (request, response, next) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.sendFile(path.join(__dirname, './public', 'success.html'), (err) => {
        if(err) {
            next(err)
        } else {
            console.log("Sent: ", "success page");
        }
        });
    });
});

// app.get("/student", (request, response) => {
//     response.sendFile(path.join(__dirname, './public', 'success.html'));
// });