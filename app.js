const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
//dotenv.config({path:'./.env'});
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const PORT= 4240;



const db = require("./models"); 

let connection = require('./database/connect');

/*
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE.PORT,
})*/ 

app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


// Setup cookie
app.use(session({
    secret : "plushOne", // Key cookie
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60*60*1000 } // expire time cookie 
}))

//parse URL-encoded bodies (as sent by HTML forms)
//make sure we can grab the data from any form
app.use(express.urlencoded({extended: false}));
/*
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL connected")
    }
})
*/




//grab the form coming in as json
app.use(express.json());
app.use(cookiesParser());

//define Routes

app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/upload',require('./routes/upload'));
require('./routes/api-routes.js')(app);


// Syncing our sequelize models and then starting our Express app
//db.sequelize.sync().then(() => {
    app.listen(process.env.PORT||PORT, () => {
        console.log(`Server listening on: http://localhost:${process.env.PORT||PORT}`);
    })
//})
  