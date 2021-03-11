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

function writeJsonSaveFile(id) {
  console.log(id);
}

app.get('/api/:userId', (req, res) => {
  userId = req.params.userId
  userSaveFiles = removeSavesFileType()
  if (userSaveFiles.includes(userId)) {
    let rawdata = fs.readFileSync(`./server/saves/${userId}.json`);
    let userData = JSON.parse(rawdata);
    res.status(200).json({userData});
  } else {
    writeJsonSaveFile('keegan.guidotti8');
    res.status(400).send({
      message: 'Error!'
   });
  };
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});