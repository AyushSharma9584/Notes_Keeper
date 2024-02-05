const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(()=>console.log("Successfully connected")).catch((e)=>console.log("err"))