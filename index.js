const express=require("express");
const staticrouter=require("./router/staticroute");
const userRouter=require("./router/userRouter");
const cookieParser = require("cookie-parser");


const{restrictlogin,authorization}=require("./middelware/auth");


const url_route=require("./router/route");
const app=express();
app.use(cookieParser());
const {connect}=require("./connection/connect");
const URL = require("./user/schema");
const path=require("path");
const router = require("./router/userRouter");
const { url } = require("inspector");
connect("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("connect");
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(restrictlogin);

 app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


// app.get("/test",async (req,res)=>{
//     const allurl=await URL.find({});
//     res.render("home",{
//         everyUrl:allurl
//     });
 app.use("/url",authorization(["normal","admin"]),url_route);

app.use("/use",staticrouter);
 app.use("/user",userRouter);


// });
// router.get("url/admin",authorization(["admin"]),(req,res)=>{
//     if(!req.user){
//         res.redirect("/login");
//     }
//     const allurl=URL.find({});
//     res.render("home",{
//         all:allurl

//     });

// });

app.listen(8001,()=>{
    console.log("server started");
});