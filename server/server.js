const express = require("express");
const bodyParser=require("body-parser");
const {ObjectId} = require('mongodb');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const answers=MongoClient
	.connect('mongodb://localhost:27017',{useUnifiedTopology:true})
	.then(function(client){
		return client.db("fp_cs554db");
	})
	.then(function(db){
		return db.collection('answers');
	}
);

app.use(bodyParser.json());

app.use(cors());

app.get("/api/answers/:email",async(req,res)=>{
	try{
		let email=req.params.email;
		let ansCollection=await answers;
		let answer=await ansCollection.findOne({email:email});
		res.json(answer).status(200).send();
	}
	catch(e){
      res.status(404)}});

app.post("/api/answers",async(req,res)=>{
	try{
		let newAnswer={
			email:req.body.email,
			answer1:req.body.answer1,
			answer2:req.body.answer2,
			answer3:req.body.answer3,
			answer4:req.body.answer4,
			answer5:req.body.answer5,
			server:req.body.server
		}
		let ansCollection=await answers;
		let answer=await ansCollection.findOne({email:req.body.email});
		if(answer===null){
			await ansCollection.insertOne(req.body);
		}
		else{
			await ansCollection.updateOne({email:req.body.email},
			{$set:req.body});
		}
		res.status(200).send();
	}
	catch(e){res.status(500)}});

app.use("*", (req, res) => {
	res.status(404).json({ error: "Not found" });
});

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:5000");
});
