import express from 'express';
import handleGenerateShortURL from '../controllers/handleGenerateShortURL.js';
import handleRedirectedURL from '../controllers/handleRedirectedURL.js';

const app=express.Router();

app.post('/', handleGenerateShortURL);
app.get('/:shortId', handleRedirectedURL);

export default app;
