import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';


//login

export const authUser = asyncHandler(
    
    async (req, res)  => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(400);
                throw new Error('User not exist')
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.status(401);
                throw new Error('Wrong password or username')
        }

        if (user) {
            generateToken(res, user._id)
            res.status(201).json(user)
 
        } else {
            res.status(400);
            throw new Error('Invalid user data')
        }

           
       
   }
)

//Registration

export const registerUser = asyncHandler(
    
    async (req, res)  => {
           
            const { username, email, name, password } = req.body;
    
            const userExist = await User.findOne({ username });

            if (userExist) {
                res.status(400);
                throw new Error('User already exists')
            }

            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = bcryptjs.hashSync(password, salt)
            const user = await User.create({
                username,
                email,
                name,
                password: hashedPassword
            })

            if (user) {
                generateToken(res, user._id)
                res.status(201).json({
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  name: user.name
                })
            } else {
                res.status(400);
                throw new Error('Invalid user data')
            }
           res.status(200).json({message:'Register User...'})
       
   }
)


// logout

export const logoutUser = asyncHandler(
    
    async (req, res)  => {
           res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
           })

           res.status(200).json({message:'Logged out User...'})
       
   }
)






