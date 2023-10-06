import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import connectDB from './config/db.js'
import path from 'path'

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/users', userRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')) )
} else {
    app.get('/', (req, res) =>res.send('server ti jino oh')) 
}


app.use(notFound)
app.use(errorHandler)
app.listen(port, ()=> console.log(`server listening on port ${port}`))

// register user post  