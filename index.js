let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')


//Import router
let apiRoutes = require("./api-routes")


//Initilize app
let app = express();


//configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


//Connect to MongoDB
mongoose.connect('mongodb://localhost/NetAlmix', {useNewUrlParser: true, useUnifiedTopology:true})
var db = mongoose.connection;
if(!db)
{
    console.log("ERROR connecting db")
} else
{
    console.log("DB connected succesfully")
}


//SEtup  port
var port = process.env.port || 8080


//Default URL
app.get('/', (req,res) => res.send('La mejor serie del mundo es Breaking Bad'))


//Launch app
app.listen(port, function()
{
    console.log("Running on port: " + port)
})






app.use('/api', apiRoutes)
