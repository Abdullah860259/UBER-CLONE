const dotenv = require('dotenv')
dotenv.config({path: ['./.env.local']});
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes')
const cookie = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes')

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get("/health", (req, res) => {
    res.send("The server is running fine");
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;