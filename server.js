const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routeItems = require('./routes/api/items');
const routeUsers = require('./routes/api/users');
const routeAuth = require('./routes/api/auth');
const config = require('config');

const app = express();

app.use(express.json());
app.use('/api/items', routeItems);
app.use('/api/users', routeUsers);
app.use('/api/auth', routeAuth);



const db = config.get('mongoURI');

mongoose.connect(db,
		{
		useNewUrlParser: true,
		useCreateIndex: true,
		}
	)
		.then(res => console.log("connected to mongodb"))
		.catch(err => console.log(err));

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;



app.listen(port, ()=> console.log(`Server stared on port ${port}`));