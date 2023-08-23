import mongoose from 'mongoose';
const {Schema} = mongoose;

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
       
    },
    descreption: {
        type: String,
        max: 500,
        default: ''
    },
    likes: {
        type: Array,
        default: []
    }


}, {timestamps: true})

export default mongoose.model('Post', PostSchema)