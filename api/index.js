import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctor.js'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';


const app = express();

app.use(cors());

// const port = 5000;
// mongoose.set("strictQuery", false);
// mongoose.connection.on("disconnected", () =>{console.log("Disconnected")})

// const connect = async () =>{
//     try{
//         mongoose.connect(process.env.MONGO)
//         console.log("Connected to Mongodb")
//     }catch(err){
//         console.log(err)
//     }
// }
app.use(cookieParser())
dotenv.config();
app.use(express.json())
app.use(bodyParser.json());
app.use(express.static('doctors'));
app.use(fileUpload());
app.use('/', doctorRoutes)
app.get('/', (req, res) => {
    res.send("hello it/s running")
})

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack : err.stack,
    })
})
app.listen(process.env.PORT  , ()=>{connectDB(); console.log(`Started running om port ${process.env.PORT}`)})