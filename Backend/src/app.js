const express = require("express")
const multer = require("multer")
const postModel = require("./models/post.model")
const uploadImage= require("./services/storage.service")
const cors = require("cors")
const authRoute = require("./routes/auth.route")
const cookie=require("cookie-parser")

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookie())
const upload = multer({storage:multer.memoryStorage() })

app.post("/create-post",upload.single("image"),async (req,res)=>{
    const result = await uploadImage(req.file.buffer)
    
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption    
    })

    res.status(200).json({
        message:"file uploaded successfully",
        post
    })
})

app.get("/posts", async(req,res)=>{
    const posts = await postModel.find()
    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })  
})

app.delete("/delete-posts/:id", async(req,res)=>{
    const id = req.params.id
    await postModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"post deleted successfully"
    })  
}
)

app.use("/api/auth",authRoute)

module.exports=app

