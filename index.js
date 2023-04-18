const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require('path');
require('dotenv').config();
require('./config/dbConnection')();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , '/views'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

const port = 3000;
app.get('/', (req, res) =>{
    res.render('home');
})

app.listen(port,console.log(`Server is running at http://localhost:${port}`));