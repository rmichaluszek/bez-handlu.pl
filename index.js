const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))

app.get('/get-month-days', (req, res) => function(){
    console.log(req.query.month)
});

app.listen(port, () => console.log('Niedziele-bez-handlu server is running on port 8080...'));