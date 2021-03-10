const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
saves = fs.readdirSync('./server/saves'); 

let rawdata = fs.readFileSync('./server/saves/franklin.m.moon.json');
let userData = JSON.parse(rawdata);
console.log(saves);

app.get('/api/:userId', (req, res) => {
  userId = req.params.userId
  
  res.json({userData});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});