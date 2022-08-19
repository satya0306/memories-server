import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import postsRoutes from './routes/posts.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts',postsRoutes);

app.use('/',(req,res)=>{
    res.send('Welcome to Satyapriya first backend projec')
});

// const CONNECTION_URL = 'mongodb+srv://satyapriya123:satyapriya123@nodejslearning.yu8cz.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 6060;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        app.listen(PORT,()=>console.log(`Server running on the port: ${PORT}`));
    })
    .catch((err)=>{
        console.log(err.message);
    })

