import {nanoid} from 'nanoid';
import urlSchema from '../models/urlSchema.js';

async function handleGenerateShortURL(req, res) {
    const body=req.body;
    //console.log(body);
    if(!body.url) return res.render('home', {error: "please enter the URl"});

    const trimmedURL= body.url.trim();
    const shortId= nanoid(8);

    await urlSchema.create({
        shortId: shortId,
        redirectedURL: trimmedURL,
        visitHistory:[],
    });
    return res.render('home', {
        id:shortId,
        error:null
    });
}

export default handleGenerateShortURL;