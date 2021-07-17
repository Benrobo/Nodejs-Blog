const mysql = require("mysql");
const dotenv = require('dotenv').config()

const dbOp = {
    host: process.env.HOST,
    user: process.env.User,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
}

const conn = mysql.createConnection(dbOp);

conn.connect((err)=>{
    if(err){
        return console.log("Database could not get conected " + err)
    }
    return console.log("connected")
})


async function getAllPostModel(req, res){
    let sql = "SELECT * FROM blogcont";
    conn.query(sql, (err, data)=>{
        if(err){
            return res.send({err: "an error occur could not fetch all posts " + err, status: "fail"})
        }

        return res.send(JSON.stringify(data))
    })
}


module.exports = {
    conn,
    getAllPostModel,
}