import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import {
    checkUser
} from "./middlewares/authMiddleware.js";
import {
    v2 as cloudinary
} from "cloudinary"
import fileUpload from "express-fileupload";




dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const app = express();
const port = process.env.Port
conn();

//ejs template  engine
app.set("view engine", "ejs");


//static files middleware
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true}))

//routers
app.use("*", checkUser);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);





app.listen(port, () => {
    console.log(`application running on port : ${port}`);
});