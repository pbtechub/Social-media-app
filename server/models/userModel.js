import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        unique: false 
    },
    profilePicture: {
        type: String,
        default: '',    
    },
    coverPicture: {
        type: String,
        default: '',    
    },
    city: {
        type: String,
        default: '',    
    },
    website: {
        type: String,
        default: '',    
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }


}, {timestamps: true})

export default mongoose.model('User', UserSchema)