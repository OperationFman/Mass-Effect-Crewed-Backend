const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
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
};

function getSaveFile(id) {
  let rawdata = fs.readFileSync(`./server/saves/${id}.json`);
  return JSON.parse(rawdata);
};

app.get('/api/post/:userId', (req, res) => {
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

app.post('/api/post', function (req, res) {
  makeNewSaveFile('applebottomjeans');
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});