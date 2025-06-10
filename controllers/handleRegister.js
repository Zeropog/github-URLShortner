import userschema from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';
import auth from '../services/cookieauth.js';

dotenv.config();

const saltrounds=10;

async function handleRegister(req, res) {
    const {email, userName, passcode} = req.body;
    if(!userName || !passcode || !email) return res.render('signup', {error: "Please enter the required fields"});

    const emailregex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailregex.test(email)) return res.render('signup', {error: "Please enter a valid email"});

    if(passcode.length<6) return res.render('signup', {error: "passcode length should be greater than 6 characters"});

    try {
        const hashedpasscode= await bcrypt.hash(passcode, saltrounds);
        const userdetails= await userschema.create( {
            userName,
            passcode: hashedpasscode,
            email
        });

        const sessionId= uuidv4();
        auth.setUserCookie(sessionId, userdetails);
        res.cookie('uid', sessionId);

        const token=jwt.sign({userId: userdetails._id}, process.env.secret_key, {expiresIn: "10m"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

         return res.status(200).redirect('/home');

    } catch (error) {
        console.log(error);
        res.status(500).send('Bad request. Please try again later');
    }

};

export default handleRegister;