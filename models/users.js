import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passcode: {
        type: String,
        required: true
    }
},

    {timestamps: true}

);

const Users= mongoose.model('users', userSchema);

export default Users;