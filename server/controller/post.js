import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import { set } from 'mongoose';


export const createPost = asyncHandler(
    
    async (req, res)  => {
        const newPost = new Post(req.body);
    
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost)

        } catch  {
            res.status(400);
            throw new Error('Invalid post data')

        }
      
   }
)


// export const createPost = asyncHandler(
    
//     async (req, res)  => {
//         console.log(req.body);
//             const { userId, name, descreption, img } = req.body;
    
          
//             const post = await User.create({
//                 userId,
//                 name,
//                 descreption,
//                 img
//             })

//             if (post) {
//                 // generateToken(res, user._id)
//                 res.status(201).json({
//                     userId: post.userId,
//                     name: post.name,
//                     descreption: post.descreption,
//                     img:post.img
//                 })
//             } else {
//                 res.status(400);
//                 throw new Error('Invalid post data')
//             }
//            res.status(200).json({message:'post created...'})
       
//    }
// )




export const updatePost = asyncHandler(
    
    async (req, res)  => {

        try {
            const post =  await Post.findById(req.params.id);
         

            if (post.userId === req.body.userId) {
                const updatedPost = await post.updateOne({$set:req.body});
                res.status(200).json(updatedPost)
    
            }

        } catch  {
            res.status(400);
            throw new Error('You can update only your post')

        }
      
       
   }
)
export const deletePost = asyncHandler(
    
    async (req, res)  => {

  

        try {
            const post =  await Post.findOne({userId:req.params.id});

            if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json('Post has been deleted successefully')
    
            } 

        } catch  {
            res.status(400);
            throw new Error('You can delete only your post')

        } 
   }
)


export const getUserPosts = asyncHandler(async (req, res) => {
  
   const currentUser = await User.findById(req.params.id)
   const currentUserPosts = await Post.find({ userId: currentUser._id})
   const userFriendArr = [...currentUser.followers, ...currentUser.following]
   const mergedArr = [...new Set(userFriendArr)]
   const friendPosts = await Promise.all(
    mergedArr.map((friendId) => {
        return Post.find({ userId: friendId})
    })
   )
   res.status(200).json(currentUserPosts.concat(...friendPosts))

   });



  export const likePost = asyncHandler(
    
    async (req, res)  => {
        const currentUserId = req.body.userId.userId

        try {
            const post =  await Post.findById(req.params.id);

            const user = await User.findById(currentUserId);

            if (!post.likes.includes(currentUserId)) {
                await post.updateOne({$push:{likes: currentUserId}});
                res.status(200).json(`Post has been liked by ${user.username}`)
    
            } else {
                await post.updateOne({$pull:{likes: currentUserId}});
                res.status(200).json(`Post has been disliked by ${user.username}`)
            }

        } catch (err) {
            res.status(400);
            throw new Error(err)

        }
      
       
   }


)


  export const commentPost = asyncHandler(
    
    async (req, res)  => {
        const comment = req.body.comments
    
        try {
            const post =  await Post.findById(req.params.id);
            const user = await User.findById(req.body.userId);

            if (comment) {
                await post.updateOne({$push:{comments: comment}});
            }


        } catch (err) {
            res.status(400);
            throw new Error(err)

        }
      
       
   }
)




