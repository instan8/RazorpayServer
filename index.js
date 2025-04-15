const express = require("express");
const  cors=require('cors');
const Razorpay = require("razorpay");
const app  = express();
require('dotenv').config();
const port=process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.post("/order",
    async (req,res)=>{
    try{

 
    const razorpay = new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET
        
    })
    const options= req.body;
    console.log(options)
    const order = await razorpay.orders.create(options)
if (!order){
    return res.status(500).send("error")}

    res.json(order);

   }
catch(err){
    console.log(err,"error")

}
}
)

app.listen(port,()=>{
    console.log("listening",port)
})