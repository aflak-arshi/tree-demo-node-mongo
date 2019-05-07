const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const treeRoutes = require('./routes/tree');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// DB Connection
mongoose.connect(process.env.URL || `mongodb://localhost:27017/treeDB`, { useNewUrlParser: true })
    .then(() => {
        console.log(`MongoDB connected!`);
    })
    .catch(err => {
        console.log(err);
    });


app.use('/tree', treeRoutes);

module.exports = app;
