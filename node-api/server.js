const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');


// start app 
const app = express();
app.use(express.json());
app.use(cors());

// starting the DataBase
mongoose.connect(
    'mongodb://192.168.99.101:27017/nodeapi', {useNewUrlParser: true, useUnifiedTopology: true});

requireDir('./src/models/');


// first route 
app.use('/api', require("./src/routes"))

app.listen(3000);