require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet ,jwtVerify} = require("jose-cjs");


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


//middilwar JWT = Json Web Token
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)
const verifiToken =async (req,res,next)=>{
  const authHeader = req.headers.authorization
  if(!authHeader){
    return res.status(401).json({ message: "Unauthorized" })
  }
  const token =authHeader.split(" ")[1]
  
  if(!token){
    return res.status(401).json({ message: "Unauthorized" })
  }
  try{
    const {payload} = await jwtVerify(token,JWKS)
    console.log(payload)
    next()
  }
  catch{
    return res.status(403).json({ message: "Forbiden" })
  }
}

async function run() {
  try {
    // await client.connect();
    const db = client.db("ideaVult")
    const ideaCollection = db.collection("ideas")
    const commentCollection =db.collection("comment")
     
    //all ideas
    app.get("/ideas", async (req, res) => {
   const { search, category } = req.query;

  const query = {};

  if (search) {
    query.project = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    query.category = category;
  }

  const result = await ideaCollection.find(query).toArray();

  res.send(result);
});

    app.post("/ideas",verifiToken,async(req,res)=>{
      const idea = req.body
      const result = await ideaCollection.insertOne(idea)
      res.send(result)
    })

    app.get("/hero",async(req,res)=>{
      const result = await ideaCollection.find().limit(6).toArray();
      res.send(result)
    })

    app.get("/ideas/:id",verifiToken,async(req,res)=>{
      const id = req.params.id
      const quari = {
        _id : new ObjectId(id)
      }
      const result = await ideaCollection.findOne(quari)
      res.send(result)
    })

    app.get("/ideas/user/:email",verifiToken,async(req,res)=>{
      const email = req.params.email
      const query = { userEmail : email };
      const result = await ideaCollection.find(query).toArray()
      res.send(result)
    })


    app.delete("/ideas/:id", async (req, res) => {
    const id = req.params.id;

    const result = await ideaCollection.deleteOne({
        _id: new ObjectId(id),
      });

     res.send(result);
    });

    app.patch("/ideas/:id", async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body
    const result = await ideaCollection.updateOne({
        _id: new ObjectId(id),
      },{$set : updateBody});

     res.send(result);
    });

    //all comment
    app.post("/comments",verifiToken, async (req, res) => {
    const comment = req.body;
    comment.createdAt = new Date();
    const result = await commentCollection.insertOne(comment);
    res.send(result);
    });

    //Delete comment
    app.delete("/comments/:id", async (req, res) => {
    const id = req.params.id;
    const quari = {
      _id : new ObjectId(id)
    }
    const result = await commentCollection.deleteOne(quari);
    res.send(result);
    });

    //edite comment
    app.patch("/comments/:id", async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body
    const quari = {
      _id : new ObjectId(id)
    }
    const result = await commentCollection.updateOne(quari,{$set:updatedData});
    res.send(result);
    });

    //nirdisto idea er jonno comments
    app.get("/comments/:ideaId",async(req,res)=>{
      const ideaId= req.params.ideaId
      const quari = { ideaId : ideaId}
      const result = await commentCollection.find(quari).toArray()
      res.send(result)
    })
    //my comment only
    app.get("/comments/user/:email",verifiToken,async(req,res)=>{
      const userEmail = req.params.email
      const quari = { email : userEmail}
      const result = await commentCollection.find(quari).toArray()
      res.send(result)
    })


    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})