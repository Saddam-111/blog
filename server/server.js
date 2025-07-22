import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './configs/database.js';
import { adminRouter } from './routes/adminRouter.js';
import { blogRouter } from './routes/blogRouter.js';
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express();

//database connection
await connectDB()

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many request. Please try again later."
  }
})


//middleware
app.use(helmet())
app.use(limiter)
app.use(cors())
app.use(express.json())

//routes

app.get( "/", (req , res ) => res.send("Api is working"))
app.use('/api/admin', adminRouter )
app.use('/api/blog', blogRouter)


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT)
})