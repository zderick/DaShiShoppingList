const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routeItems = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());
app.use('/api/items', routeItems);

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
		.then(res => console.log("connected to mongodb"))
		.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server stared on port ${port}`));