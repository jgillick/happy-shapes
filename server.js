const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');

const PORT = 3000;
const SAVE_PATH = path.resolve('./cards-generated');

const app = express();
app.use(
  express.static('web', {'index': ['index.html']})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/save', (req, res, next) => {
  const { shape, color, img } = req.body;
  if (!shape || !color || !img) {
    return;
  }
  const fileName = `${shape}-${color}.png`;

  // Remove data prefix
  const imgData = img.replace(/^data:image\/png;base64,/, '');

  // Save file
  console.log('Saving', fileName);
  fs.writeFile(path.join(SAVE_PATH, fileName), imgData, 'base64', (err) => {
    if(err) {
      return next(err);
    }
    res.end();
  });
});


// Create save directory, if needed
if (!fs.existsSync(SAVE_PATH)){
  fs.mkdirSync(SAVE_PATH);
}

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`));
