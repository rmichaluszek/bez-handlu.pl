const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))

app.get('/get-data', (req, res) => function(){
    var testData = {
        '2018' : [
            [1,8,15,22,29],
            [1,8,15,22],
            [1,8,15,22],
            [1,8,15,22,29],
            [1,8,15,22,29],
            [1,8,15,22],
            [1,8,15,22,29],
            [1,8,15,22,29],
            [1,8,15,22],
            [1,8,15,22],
            [1,8,15,22,29],
            [1,8,15,22]
        ]
    }
    res.send(testYearInfo);
});

app.listen(port, () => console.log('Niedziele-bez-handlu server is running on port 8080...'));