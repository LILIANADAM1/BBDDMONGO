//Filename: index.js

let express = require('express')
let bodyParser = require ('body-parser')
let mongoose = require('mongoose')

let apiRoutes = require("./api-routes")

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/NetAlmix', {useNewUrlParser: true, useUnifiedTopology: true}) 
.then(() => {
    console.log('DB connected successfully');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });
var db = mongoose.connection;
if(!db)
{
    console.log("ERROR connecting db")

}else
{
    console.log("DB connected succesfully")
}
var port = process.env.port || 8080

app.get('/', (req,res) => res.send('El mejor proyecto BBDD mongo de la historia'))

app.listen(port, function()
{
    console.log("Running on port: " + port)
});

app.use('/api', apiRoutes)
