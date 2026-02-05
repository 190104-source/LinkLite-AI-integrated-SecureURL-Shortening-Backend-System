const {render,show,display}=require("../controller/staticcontroller");
const{authorization}=require("../middelware/auth");
const express=require("express");
const router=express.Router();
router.get("/",authorization(["normal"]),render);
router.get("/signup",show);
router.get("/login",display);

module.exports=router;