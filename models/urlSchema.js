import mongoose from 'mongoose';

const urlSchema= new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },

    redirectedURL: {
        type: String,
        required: true,
    },

    clickimpression: {
        type: Number,
        required: false,
    },

    visitHostory: [{ 
        timestamp: { 
            type: Number,
    }}],

},
    {timestamp: true}
);

const URL= mongoose.model('url', urlSchema);

export default URL;