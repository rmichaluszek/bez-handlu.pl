const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080


app.get('/api/get-data', (req, res) => {
   var testData = {
        '2018' : [
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"holiday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"holiday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"holiday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"],[29,"sunday"]],
            [[1,"sunday"],[8,"holiday"],[15,"holiday"],[22,"sunday"]]
        ]
    }  
    res.send(testData);
});

var getDataSchema = mongoose.Schema({
    year: Number,
    months: Array,
    _id: { // prever app from getting id of the year because that's not needed
      type: String,
      select: false,
      required: true,
    }
});
var Data = mongoose.model('data', getDataSchema,'days');

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/bez-handlu",{ useNewUrlParser: true }).then(
    () => {console.log('Connected to the database') },
    err => { console.log('Error connecting to the database: ' +err)});

    console.log("super");  
            
    Data.find(function(err, res){
        console.log(res);
    });

app.listen(port, () => console.log('Bez-handlu.pl server is running on port 8080...'));

