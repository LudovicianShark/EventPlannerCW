const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');


const items = require('./routes/api/items');

const app = express();

//Bodyparser Midlleware
app.use(BodyParser.json());

// DB configuration
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Successfully Connect...'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
