const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');

app.use(cors())
app.use(bodyParser.json());
saves = fs.readdirSync('./server/saves'); 

function removeSavesFileType() {
  const result = new Array(saves.length)
  for (let i = 0; i < saves.length; ++i) {
      result[i] = saves[i].slice(0, -5)
  };
  return result
};

function makeNewSaveFile(id) {
  let rawTemplate = fs.readFileSync('./server/saves/template.json');
  let template = JSON.parse(rawTemplate);
  let data = JSON.stringify(template, null, 2);
  fs.writeFileSync(`./server/saves/${id}.json`, data)
  console.log(`Created/Updated save with id: ${id}.`)
};

function getSaveFile(id) {
  let rawdata = fs.readFileSync(`./server/saves/${id}.json`);
  return JSON.parse(rawdata);
};

app.get('/api/get/:userId', (req, res) => {
  userId = req.params.userId
  userSaveFiles = removeSavesFileType()
  if (userSaveFiles.includes(userId)) {
    let userData = getSaveFile(userId);
    res.status(200).json({userData});
  } else {
    makeNewSaveFile(userId);
    let userData = getSaveFile(userId);
    res.status(200).json({userData});
  };
});

app.post('/api/update/:userId', (req, res) => {
  reqBody = req.body;
  updatedData = JSON.stringify(reqBody, null, 2);
  userId = req.params.userId;
  fs.writeFileSync(`./server/saves/${userId}.json`, updatedData)
  console.log(`Created/Updated save with id: ${userId}.`)
  res.status(200)
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
