import express from 'express';
import mongoose from 'mongoose';
import { Mongodburl } from './config.js';
import userauth from './routes/auth.js';
import cookieParser from 'cookie-parser';
import restrictToLogInuser from './Middleware/authorizeUserByCookie.js';
import shortIdGen from './routes/url.js';
import staticRoute from './routes/staticRoute.js';
import path from 'path';

const app=express();
const port=4000;

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/auth', userauth);
app.use('/url',restrictToLogInuser,shortIdGen);
app.use('/home', staticRoute);

mongoose.connect(Mongodburl)
.then(function() {
    console.log('The Database is connected');
    app.listen(port, function() {
        console.log(`The server is up at ${port}`);
    });
})
