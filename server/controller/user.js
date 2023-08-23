import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';



export const getUserProfile = asyncHandler(
    
    async (req, res)  => {
    
        try{
            const getUser = await User.findById(req.params.id)
            res.status(200).json(getUser)
        } catch(err) {
            res.status(400);
                throw new Error('Invalid user data')
        }
            
   }
)


// Get all user profile

export const getAllUsers = asyncHandler(async (req, res) => {
 
  try {
    const allUser = await User.find();
  
    res.status(200).json(allUser)
  } catch (err) {
    res.status(404);
    throw new Error('Users not found');
  }
    
  });

export const updateUserProfile = asyncHandler(
    
    async (req, res)  => {

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body.others}, {new: true})
            res.status(200).json([updatedUser])
        } catch(err) {
            res.status(400);
                throw new Error('Invalid user data')
        }
           
       
   }
)

// export const updateUserProfile = asyncHandler(async (req, res) => {
 
//   console.log(req.params.id);
  
//     const user = await User.findById(req.params.id);
//     const upUser = req.body.others
//     console.log(upUser);
  
//     if (user) {
//       user.username = upUser.username || user.username;
//       user.name = upUser.name || user.name;
//       user.city = upUser.city || user.city;
//       user.website = upUser.website || user.website;
//       user.coverPicture = upUser.coverPicture || user.coverPicture;
//       user.profilePicture = upUser.profilePicture || user.profilePicture;
  
//       // if (req.body.password) {
//       //   user.password = req.body.password;
//       // }
  
//       const updatedUser = await user.save();
  
//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//       });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   });


  export const followUser = asyncHandler(
    
    async (req, res)  => {
   
      const currentUserId = req.body.userId.userId


      if (currentUserId !== req.params.id) {
        try {
          const user =  await User.findById(req.params.id);

          const currentUser = await User.findById(currentUserId);

          if (!user.followers.includes(currentUserId)) {
              await user.updateOne({$push:{followers: currentUserId}});
              await currentUser.updateOne({$push:{following: req.params.id}});
              res.status(200).json(`You have following ${user.username}`)
  
          } else {
            await user.updateOne({$pull:{followers: currentUserId}});
            await currentUser.updateOne({$pull:{following: req.params.id}});
            res.status(200).json(`You have unfollowing ${user.username}`)
          }

      } catch (err) {
          res.status(400);
          throw new Error(err)

      }

      } else {
        res.status(401);
        throw new Error('You cant follow yourself')
      }


      
       
   }
)



  export const getFollowers = asyncHandler(
    
    async (req, res)  => {
      try {
        const currentUser = await User.findById(req.params.id);
     
        // const intersections = currentUser.followers.filter(e => currentUser.following.indexOf(e) !== -1)
        
        // const friends = User.find({ _id : { $in : intersections }});
        res.status(200).json(currentUser.followers)
      
      } catch (err) {
        res.status(401);
        throw new Error('Somthing went wrong...')
      }
       
   }
)
  export const getFollowings = asyncHandler(
    
    async (req, res)  => {
      try {
        const currentUser = await User.findById(req.params.id);
    
        // const intersections = currentUser.followers.filter(e => currentUser.following.indexOf(e) !== -1)
        
        // const friends = User.find({ _id : { $in : intersections }});
        res.status(200).json(currentUser.following)
      } catch (err) {
        res.status(401);
        throw new Error('Somthing went wrong...')
      }
       
   }
)


