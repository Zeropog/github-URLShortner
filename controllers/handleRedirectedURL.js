import urlSchema from '../models/urlSchema.js';

async function handleRedirectedURL(req, res) {
    const shortId= req.params.shortId;
    console.log(shortId);
    const redirectURL= await urlSchema.findOne({shortId});

    if(!redirectURL|| !redirectURL.redirectedURL) return res.status(401).send('url not found');
    await urlSchema.findOneAndUpdate({ shortId}, {
        $push: {timestamp: Date.now()},
        $inc: {clickimpression:1}
    },
        {new: true}
    );

return res.redirect(redirectURL.redirectedURL);
}

export default handleRedirectedURL;