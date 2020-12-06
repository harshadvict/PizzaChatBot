const express = require("express");
const router =express.Router();

const mysql = require("mysql");
const con=mysql.createPool({
    connectionLimit : 5,
    host: 'b9k3rcwphrnz4aqzcitg-mysql.services.clever-cloud.com',
    user: 'uk80a6qxu0zrcarm',
    password: '3ho6lrboOjrWUAamF75n',
    database: 'b9k3rcwphrnz4aqzcitg'
});

//connection part
con.getConnection((err)=>{
    if(err){
        console.log("not connected");
    }
    else{
        console.log("connected..");
    }
});
router.get('/api/v1/:question',(req,res)=>{
    let sql= "select * from chat_conversastion where question=?";
    let query=con.query(sql,[req.params.question],(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.post('/api/v1/createOrder',(req,res)=>{
    let sql="insert into user (phoneNumber,name,pizzaName,address,orderId,status) values (?,?,?,?,?,?)";
    con.query(sql,[req.body.phoneNumber,req.body.name,req.body.pizzaName,req.body.address,req.body.orderId,req.body.status],(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response":results}));
    });
});

router.get('/api/v1/orderStatus/:OrderId',(req,res)=>{
    let sql="select * from user where orderId=?";
    con.query(sql,[req.params.OrderId],(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"error":null,"response":results}));
    });
});

router.get('/api/v1/cancelOrder/:OrderId',(req,res)=>{
    let sql="UPDATE user set status = 'is cancelled' where orderId=?";
    con.query(sql,[req.params.OrderId],(err,results)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"error":null,"response":results}));
    }); 
});
module.exports=router;