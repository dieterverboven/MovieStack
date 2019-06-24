var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

app.use(cors());

//routes
const drinkRoutes = require('./api/routes/drinks');
const foodRoutes = require('./api/routes/food');

mongoose.connect('mongodb+srv://admin:admin@snacks-hjl6m.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Drinks', drinkRoutes);
app.use('/Food', foodRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
    res.send('Hello World');
 });
 
 app.listen(port, function() {
     console.log("Server is running");
 });