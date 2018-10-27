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

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/bez-handlu-db",{ useNewUrlParser: true }).then(
    () => {console.log('Connected to the database') },
    err => { console.log('Error connecting to the database: ' +err)
});
app.listen(port, () => console.log('Bez-handlu.pl server is running on port 8080...'));