var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

app.use(cors());

//routes
const drinkRoutes = require('./api/routes/drinks');
const foodRoutes = require('./api/routes/food');

mongoose.connect('mongodb://admin:admin@snacks-shard-00-00-hjl6m.mongodb.net:27017,snacks-shard-00-01-hjl6m.mongodb.net:27017,snacks-shard-00-02-hjl6m.mongodb.net:27017/test?ssl=true&replicaSet=Snacks-shard-0&authSource=admin&retryWrites=true');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Drinks', drinkRoutes);
app.use('/Food', foodRoutes);

app.get('/', (req, res)=> {
    res.send('Hello World');
});
 
app.listen(process.env.PORT || 3000, function(){
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});