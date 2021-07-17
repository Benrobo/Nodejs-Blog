const express = require("express");
const bodyParser = require("body-parser")
const app = express();



const router = express.Router();
app.use(bodyParser.json())
// controller
const {insertPost, getAllPost, renderPosts, renderEditPage, editPost, delePost} = require("../controller/logic");



router.get("/post/all", (req, res)=>{
    return getAllPost(req, res)
})

router.get("/post/:id", (req, res)=>{
    return renderPosts(req, res, req.params);
})

// return post page
router.get("/addpost", (req, res)=>{
    res.render("addpost", {type: "post", data: ["dummy data"]})
})
// return edit page
router.get("/addPost/:id", (req, res, id)=>{
    return renderEditPage(req, res, req.params.id)
})

// addpost
router.post("/addPost", (req, res)=>{
    return insertPost(req, res, req.body)
})

// edit post content
router.post("/editPost/:id", (req, res)=>{
    return editPost(req, res, req.params.id, req.body)
})

// delete post
router.get("/deletePost/:id", (req, res)=>{
    return delePost(req, res, req.params.id)
})

module.exports = {
    router
}