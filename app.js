/* eslint-disable import/no-dynamic-require */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// eslint-disable-next-line no-path-concat
// eslint-disable-next-line import/no-dynamic-require
// eslint-disable-next-line no-path-concat
const config = require(__dirname + '/config/app.json');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || config.port || 8000;

// this lets us parse 'application/json' content in http requests
app.use(bodyParser.urlencoded({ extended: true }));

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});
app.use('/', require('./controllers'));


db.sequelize.sync({ force: true, logging: false }).then(() => {
  console.log('Database & tables created!');
  const { exec } = require('child_process');
  exec('npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});


// start up the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
