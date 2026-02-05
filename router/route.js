const express=require("express");
const router=express.Router();
const {generateshorturl,analytics,admin}=require("../controller/control");
const{restrictlogin,checkauth,authorization}=require("../middelware/auth");
router.post("/",generateshorturl);
router.get("/analytics/:shortId",analytics);
router.get("/admin",authorization(["admin"]),admin);
module.exports=router;