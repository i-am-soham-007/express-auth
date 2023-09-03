import express from 'express';
import connectDB from './config/connection';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
//const {engine} = require('express-handlebars')

dotenv.config();
connectDB(process.env.mongodbURL || '');

const app = express();

// app.engine('.hbs', engine({
//     extname: '.hbs',
//     defaultLayout: false,
//     layoutsDir: 'views'
// }));
app.use(express.json());
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');    


// ADMIN ROUTE HERE
const adminRoute = require('./routes/admin_routes');
app.use(adminRoute.router); 

app.listen(process.env.PORT, async () => {
    console.log(`listening on port ${process.env.PORT}`);
});
