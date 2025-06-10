import express from 'express';

const app= express.Router();

app.get('/', function(req, res) {
    return res.render('home', {error: null, id: null});
});
app.get('/signup', function(req, res) {
    return res.render('signup');
});
app.get('/login', function(req,res) {
    return res.render('login', {error: null});
});
app.get('/logout', function(req,res) {
    return res.render('logout');
});

export default app;