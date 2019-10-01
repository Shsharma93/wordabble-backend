const express = require('express');
const app = express();
const cors = require('cors');
const DB_CONNECT = require('./config/db');

require('dotenv').config();
DB_CONNECT();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/game', require('./routes/game'));

app.listen(process.env.PORT || 5000);
