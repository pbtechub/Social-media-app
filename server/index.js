import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auths.js'
import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import commentRouter from './routes/comments.js'
import uploadRouter from './routes/uploads.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { connectDb } from './db.js'
import cookieParser from 'cookie-parser';
import multer from 'multer'

dotenv.config()

const app = express()

connectDb()

const PORT = process.env.PORT || 8600;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
// app.use('/api', uploadRouter)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  // console.log(req.file);
  res.status(200).json(file.filename);
});

app.use(notFound)
app.use(errorHandler)





app.listen(PORT, console.log(`Server running at port: http://localhost:${PORT}`))


