const express=require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app=express();
const multer=require("multer");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();
// line 6 to line 15 we will get from expressjs.com website as disk storage
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'uploads')
    },
    filename:(req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })
app.use(cors());
// app.use(express.json()); collects the data and stores it
app.use(express.json());
app.use(express.urlencoded());
// app.use('/uploads',express.static('uploads')); is used to give access to the images in uploads folder to show in UI
app.use('/uploads', express.static('uploads'));
app.listen(process.env.port,()=>{
    console.log(`Listening To Port ${process.env.port}`);
 })
//  upload.none() is used for saying tht we r uploading anything upload.single() for singlr file upload.arrar[] for multiole files
 app.post("/signup",upload.array("profilepic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    let userArr=await User.find().and({email:req.body.email});
    if (userArr.length>0) {
        res.json({status:"failure",msg:"User already Exist"});
    }else{

      let hashedPassword=await bcrypt.hash(req.body.password,10);
        try {
            let newUser=new User({
                firstName:req.body.firstName,
                  lastName:req.body.lastName,
                  age:req.body.age,
                  email:req.body.email,
                  password:hashedPassword,
                  profilepic:req.files[0].path,
             });
            await newUser.save();
             res.json({status:"Success",msg:"User Created Successfully"});
         } catch (error) {
            res.json({status:"Failed",error:error});
         }
    }
    
 })
 app.put("/updateProfile",upload.single("profilepic"),async(req,res)=>{
  console.log(req.body);
  console.log(req.file);
  try {
    if(req.body.firstName.length>0){
      await User.updateMany({email:req.body.email},
        {firstName:req.body.firstName});
    }
    if(req.body.lastName.length>0){
      await User.updateMany({email:req.body.email},
        {lastName:req.body.lastName});
    }
    if(req.body.age.length>0){
      await User.updateMany({email:req.body.email},
        {age:req.body.age});
    }
    if(req.body.password.length>0){
      await User.updateMany({email:req.body.email},
        {password:req.body.password});
    }
    if (req.file && req.file.path) {
      await User.updateMany({email:req.body.email},
        {profilepic:req.file.path});
    }
    res.json({status:"success",msg:"User Details Updated Successfully✅"});
    
  } catch (error) {
    res.json({status:"failure",msg:"Error Occured"});
  }
 
 });
 app.delete("/deleteprofile",async(req,res)=>{
  console.log(req.query.email);
  try {
    await User.deleteMany({email:req.query.email});
  res.json({status:"success",msg:"User Deleted Successfully✅"});
  } catch (error) {
    res.json({status:"failure",msg:"Unable To Delete ❌",error:error});
  }
  
 });
let connectToMDB=async()=>{
    try {
        mongoose.connect(process.env.dbpath);
        console.log("Succesfully Connected TO MDB")
        
    } catch (error) {
        console.log("Unable to Connect TO MDB")
    }
    
}
app.post("/signup",(req,res)=>{
    console.log(req.body);
    res.json("User Created Successfully")
})

app.post("/validateToken",upload.none(),async(req,res)=>{
  console.log(req.body.token);

  try {
    let decryptedObj=jwt.verify(req.body.token,"huh");
  console.log(decryptedObj);

  let fetchedData= await User.find().and({email:decryptedObj.email});
 console.log(fetchedData);
 if (fetchedData.length>0) {
  let passwordResult=await bcrypt.compare(decryptedObj.password,fetchedData[0].password);
  if (passwordResult== true) {
    let dataToSend={
        firstName:fetchedData[0].firstName,
        lastName:fetchedData[0].lastName,
        age:fetchedData[0].age,
        email:fetchedData[0].email,
        profilepic:fetchedData[0].profilepic,
    } 
    res.json({status:"success",data:dataToSend});
  }else{
    res.json({status:"failure",msg:"Invalid Password"});
  }
  
 }else{
  res.json({status:"failure",msg:"User Not Exist"})
 }
    
  } catch (error) {
    res.json({status:"failure",msg:"Invalid Token ❌",error:error})
  }
  
})

let userSchema = new mongoose.Schema({
    firstName:String,
      lastName:String,
      age:Number,
      email:String,
      password:String,
      profilepic:String,
})
let User=new mongoose.model("user",userSchema);
app.post("/login",upload.none(),async(req,res)=>{
 console.log(req.body);
 let fetchedData= await User.find().and({email:req.body.email});
 console.log(fetchedData);
 if (fetchedData.length>0) {
  let passwordResult=await bcrypt.compare(req.body.password,fetchedData[0].password);
  if (passwordResult== true) {
    // huh is a secret sign used to decrypt the password
    let token =jwt.sign({email:req.body.email,password:req.body.password},"huh");
    let dataToSend={
        firstName:fetchedData[0].firstName,
        lastName:fetchedData[0].lastName,
        age:fetchedData[0].age,
        email:fetchedData[0].email,
        profilepic:fetchedData[0].profilepic,
        token:token,
    }
    res.json({status:"success",data:dataToSend});
  }else{
    res.json({status:"failure",msg:"Invalid Password"});
  }
  
 }else{
  res.json({status:"failure",msg:"User Not Exist"})
 }
})
 
connectToMDB();