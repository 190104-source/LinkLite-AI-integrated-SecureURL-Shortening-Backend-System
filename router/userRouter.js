console.log("file");
const express=require('express');

const {signrequest,logrequest}=require("../controller/userControl.js");
const router=express.Router();
// router.post("/",userControl);
// router.post("/login",check);
router.post("/signuprequest",signrequest);
router.post("/loginrequest",logrequest);
module.exports=router;