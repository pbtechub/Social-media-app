import asyncHandler from 'express-async-handler'
import Comment from '../models/commentModel.js'
import User from '../models/userModel.js'


export const createComment = asyncHandler(
    
    async (req, res)  => {
        const newComment = new Comment(req.body);
      
        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment)

        } catch  {
            res.status(400);
            throw new Error('Invalid Comment data')

        }
      
   }
)


// export const createComment = asyncHandler(
    
//     async (req, res)  => {
//         console.log(req.body);
//             const { userId, name, descreption, img } = req.body;
    
          
//             const Comment = await User.create({
//                 userId,
//                 name,
//                 descreption,
//                 img
//             })

//             if (Comment) {
//                 // generateToken(res, user._id)
//                 res.status(201).json({
//                     userId: Comment.userId,
//                     name: Comment.name,
//                     descreption: Comment.descreption,
//                     img:Comment.img
//                 })
//             } else {
//                 res.status(400);
//                 throw new Error('Invalid Comment data')
//             }
//            res.status(200).json({message:'Comment created...'})
       
//    }
// )




// export const updateComment = asyncHandler(
    
//     async (req, res)  => {

//         try {
//             const Comment =  await Comment.findById(req.params.id);
//             console.log(Comment);

//             if (Comment.userId === req.body.userId) {
//                 const updatedComment = await Comment.updateOne({$set:req.body});
//                 res.status(200).json(updatedComment)
    
//             }

//         } catch  {
//             res.status(400);
//             throw new Error('You can update only your Comment')

//         }
      
       
//    }
// )

// export const deleteComment = asyncHandler(
    
//     async (req, res)  => {

//         // console.log(req.params.id);
//         // console.log(req.body.userId);

//         try {
//             const Comment =  await Comment.findOne({userId:req.params.id});

//             if (Comment.userId === req.body.userId) {
//                 await Comment.deleteOne();
//                 res.status(200).json('Comment has been deleted successefully')
    
//             } 

//         } catch  {
//             res.status(400);
//             throw new Error('You can delete only your Comment')

//         }
      
       
//    }
// )


export const getUserComments = asyncHandler(async (req, res) => {
  
   const postComments = await Comment.find()
   res.status(200).json(postComments)

 

  });






