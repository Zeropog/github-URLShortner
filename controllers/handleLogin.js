import userschema from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import auth from '../services/cookieauth.js';
import dotenv from 'dotenv';

dotenv.config();

async function handleLogin(req,res) {
    const {email, passcode}= req.body;
    if(!email || !passcode) return res.render('login', {error: "please enter the valid email/passcode"});

    try {
        const userdetails=  await userschema.findOne({email});
        if(!userdetails) return res.render('login', {error: "This email is not registered in the database, please enter a valid email"});

        const matchedpasscode= await bcrypt.compare(passcode, userdetails.passcode);
        if(!matchedpasscode) return res.render('login', {error: "please enter the correct credentials for verification"});

        // Generating the sessionId and sending the uid to the user as a response.
        const sessionId= uuidv4();
        auth.setUserCookie(sessionId, userdetails);
        res.cookie('uid', sessionId);  
        
        const payload= {
            id: userdetails.id,
            name: userdetails.userName,
            email: userdetails.email
        }
        //console.log(payload);

        const token=jwt.sign(payload, process.env.secret_key, {expiresIn: "10m"});
        

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

        return res.redirect('/home');

    } catch (error) {
        console.log(error);
        res.status(400).send('Bad request. Please try again later');
    }
};

export default handleLogin;