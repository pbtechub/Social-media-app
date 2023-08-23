import asyncHandler from 'express-async-handler'
import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../public/uploads')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, Date.now() + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })

export const uploadFile = asyncHandler(
    
    async (req, res)  => {
      console.log(req.files);
    
        // upload.single('file'), (req, res) => {
         
        //     const file = req.file
        //     res.status(200).json(file.filename)
        //   }
      
   }
)