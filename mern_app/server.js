const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');


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

// Server static assests if in prpduction
if(process.env.NODE_ENV  === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
