const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

let rawdata = fs.readFileSync('./server/saves/franklin.m.moon.json');
let userData = JSON.parse(rawdata);
console.log(userData);

app.get('/api', (req, res) => {
    res.json({message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});