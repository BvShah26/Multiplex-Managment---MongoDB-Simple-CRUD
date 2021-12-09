const express = require('express')
require('dotenv').config();
const app = express()
const port = 5000
app.use(express.json());

const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGOURL)
    .then(console.log('MongoDB Connected'));

const MultiplexRouter = require('./routers/Multiplex');
const ScreenRouter = require('./routers/Screen');

app.get('/', (req, res) => res.send('Multiplex Managment System!'))

app.use("/multiplex", MultiplexRouter);
app.use("/screen", ScreenRouter);


app.listen(port, () => console.log(`Multiplex Managment listening on port ${port}!`))