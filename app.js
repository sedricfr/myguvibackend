const express = require("express")
const mongoose= require("mongoose")
const collection = require("./mongo")
const uri ="mongodb+srv://vcai:votechain%402023@clustervcai.rdtq9yy.mongodb.net/react-login-tut?retryWrites=true&w=majority";

const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'https://tubular-cheesecake-ac28b9.netlify.app'}))



app.get("/",cors(),(req,res)=>{

})


app.post("https://tubular-cheesecake-ac28b9.netlify.app/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("https://tubular-cheesecake-ac28b9.netlify.app/signup",async(req,res)=>{
    const{name,email,password,cpass}=req.body

    const data={
        name:name,
        email:email,
        password:password,
        cpass:cpass
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }

  connect();

  const port = process.env.PORT || 3000;


  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

