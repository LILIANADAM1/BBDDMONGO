//Filename: index.js

//Import express
let express = require('express')
let bodyParser = require ('body-parser')
let mongoose = require('mongoose')

//Import router 
let apiRoutes = require("./api-routes")

//Initile app 
let app = express();

//configure bodyparser to handle post requests, //traducccion al json 
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

//Connect to MongoDB
mongoose.connect('mongodb://localhost/NetAlmix', {useNewUrlParser: true, useUnifiedTopology: true}) 

var db = mongoose.connection;
if(!db)
{
    console.log("ERROR connecting db")

}else
{
    console.log("DB connected succesfully")
}
//setup port 
var port = process.env.port || 8080

//Default URL 
app.get('/', (req,res) => res.send('El mejor proyecto BBDD mongo de la historia'))

//Launch app 
app.listen(port, function()
{
    console.log("Running on port: " + port)
});

app.use('/api', apiRoutes)
