const {conn, getAllPostModel} = require("../model/postModel");
const {v4: uuidv4} = require("uuid")
// insertPost
function insertPost(req, res, body){
    let randomid = uuidv4()
    let {posttitle, author, postmedia, content} = body
    if(posttitle == "" || author == "" || postmedia == "" || content == ""){
        return res.send({
            status: "fail",
            err: "Fields cannot be empty"
        })
    }
    let sql = `INSERT INTO blogcont(uuid,title, body,media,author) VALUES('${randomid}','${posttitle}','${content}','${postmedia}','${author}')`
    conn.query(sql, (err, data)=>{
        if(err){
            return res.send({
                status: "fail",
                err: "Fail to add post "+err
            })
        }
        return res.send({
            status: "success",
            err: "Post added successsfully",
            type: "post"
        })
    })
}

// getall posts
async function getAllPost(req, res){
    let data = await getAllPostModel(req, res)
}

function renderPosts(req , res, pid){
    let postid = pid.id;
    let sql =  `SELECT * FROM blogcont WHERE uuid= ?`;
    
    conn.query(sql, [postid], (err, data)=>{
        if(err){ 
            return res.send({err: "an error occur could not fetch all posts " + err, status: "fail"})
        }
        else if(data == ""){
            return res.render("404")
        }
        else{
            return res.render("posts",{data})
        }

    })
}

function renderEditPage(req, res, pid){
    let id = pid;
    let sql = "SELECT * FROM blogcont WHERE uuid = ?";
    conn.query(sql, [id], (err, data)=>{
        if(err){
            return console.log(err)
        }
        return res.render("addpost", {data: data, type: "edit"})
    })
}

function editPost(req, res, pid, body){
    let postid = pid;
    let {posttitle, author, postmedia, content} = body
    let sql = `UPDATE blogcont SET title = '${posttitle}', author = '${author}', media = '${postmedia}', body = '${content}' WHERE uuid = '${postid}'`;
    conn.query(sql,[posttitle, author, postmedia,content], (err, data)=>{
        if(err){
            return res.send({
                status: "fail",
                err: "An error occur while saving changes " + err
            })
        }
        else{
            return res.send({
                status: "success",
                err: "Post Successfully edited"
            })
        }
    })
}

function delePost(req, res, id){
    if(id){
        let postid = id;
        let sql = `DELETE FROM blogcont WHERE uuid='${postid}'`;
        conn.query(sql, (err, data)=>{
            if(err){
                return res.send({status: "fail", err: "Post could not be deleted " + err})
            }
            return res.render("index")
        })
    }
}

module.exports = {
    insertPost,
    getAllPost,
    renderPosts,
    renderEditPage,
    editPost,
    delePost
}