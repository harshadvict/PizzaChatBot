const express = require("express");
const bodyparser = require("body-parser");
var cors = require('cors');
var path=require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(cors());


var chatbot=require('./routes/chat');
app.use('/chatbot',chatbot);

app.use(express.static(path.join(__dirname,'public')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})
//Server listening
app.listen(port,() =>{
    console.log('Server started on port 3000...');
  });
