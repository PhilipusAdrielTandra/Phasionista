const express = require('express');
const app = express()
const port = 5000

app.get('/', function(req, res) {
    res.send('index.html');
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

