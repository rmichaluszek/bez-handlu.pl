const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080


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

app.get('/api/get-data', (req, res) => {
   Data.find(function(err, result){
      if (err === true) {
          res.send({'status':'error','message':'Nie udało się połączyć z bazą danych. </br>Skontaktuj się z twórcą aplikacji.'})
      } else {
          res.send({'status':'success','data':result});
      }
   });
    
});

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/bez-handlu",{ useNewUrlParser: true }).then(
    () => {console.log('Connected to the database') },
    err => { console.log('Error connecting to the database: ' +err)});

app.listen(port, () => console.log('Bez-handlu.pl server is running on port 8080...'));

