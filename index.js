const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080


app.get('/api/get-data', (req, res) => {
   /* var testData = {
        '2018' : [
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true]],
            [[1,true],[8,false],[15,false],[22,true]],
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true]],
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true]],
            [[1,true],[8,false],[15,false],[22,true]],
            [[1,true],[8,false],[15,false],[22,true],[29,true]],
            [[1,true],[8,false],[15,false],[22,true]]
        ]
    }*/

    

    res.send(testData);
});

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/bez-handlu-db",{ useNewUrlParser: true }).then(
    () => {console.log('Connected to the database') },
    err => { console.log('Error connecting to the database: ' +err)
});
app.listen(port, () => console.log('Bez-handlu.pl server is running on port 8080...'));