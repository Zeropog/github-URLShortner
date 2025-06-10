import auth from '../services/cookieauth.js';
import jwt from 'jsonwebtoken';

function restrictedToLogInUserOnly(req, res, next) {
    const usersession= req.cookies.uid;
    const tokenid= req.cookies.token;
    if(!tokenid || !usersession) {
        res.clearCookie('token');
        res.clearCookie('uid');
        return res.redirect('/home/login');
    }
    
    jwt.verify(tokenid, process.env.secret_key, function(err,decoded) {
        if(err || Date.now() >= decoded.exp*1000) {
            res.clearCookie('token');
            return res.redirect('/home/login');
        }

        const verifysession= auth.getUserCookie(usersession);
        if(!verifysession) {
            res.clearCookie('uid');
            return res.redirect('/home/login/');
        }

        //console.log(req.body);
        next();
    });

}

export default restrictedToLogInUserOnly;