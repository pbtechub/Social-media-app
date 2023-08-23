import express from 'express'
import { 
    followUser, 
    getAllUsers, 
     getFollowers,  
    getFollowings,  
    getUserProfile,  
    updateUserProfile, } from '../controller/user.js';
import { verifyToken } from '../middleware/verifyAuth.js';


const router = express.Router();



router.route('/profile/:id').get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile)
router.route('/:id/follow').put(verifyToken, followUser)
router.get('/', getAllUsers)
router.get('/followers/:id', getFollowers)
router.get('/followings/:id', getFollowings)


export default router
