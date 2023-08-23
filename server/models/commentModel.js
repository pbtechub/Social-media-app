import mongoose from 'mongoose';
const {Schema} = mongoose;

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
        max: 500,
        default: ''
    },
    replies: {
        type: Array,
        default: []
    },


}, {timestamps: true})

export default mongoose.model('Comment', commentSchema)