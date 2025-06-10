import express from 'express';
import handleRegister from '../controllers/handleRegister.js';
import handleLogin from '../controllers/handleLogin.js';
import handleLogout from '../controllers/handleLogout.js';

const app=express.Router();

app.post('/register', handleRegister);
app.post('/login', handleLogin);
app.post('/logout',handleLogout);


export default app;