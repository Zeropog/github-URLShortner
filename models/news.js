import mongoose from 'mongoose';

const newsschema= mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        type: false
    }
},
    {timestamp: true}
);

const news= mongoose.model('newsSchema', newsschema);

export default news;