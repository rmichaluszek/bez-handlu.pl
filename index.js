const express = require('express')
const app = express()
const port = 8080

app.get('/api/get-data', (req, res) => {
    var testData = {
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
    }
    res.send(testData);
});

app.use(express.static('public'))

app.listen(port, () => console.log('Niedziele-bez-handlu server is running on port 8080...'));