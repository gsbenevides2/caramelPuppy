const fs = require("fs")

module.exports = (app,credential,logGetter,deleteAll)=>{
 if(!app){
	app = require("express")()
 }
 if(!credential) credential = "null"
 app.get("/caramelPuppy",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 res.sendFile(__dirname+"/public/index.html")
	}
 })
 app.get("/caramelPuppy/json-viewer.js",(req,res)=>{
	res.sendFile(__dirname+"/public/json-viewer.js")
 })
 app.get("/caramelPuppy/json-viewer.css",(req,res)=>{
	res.sendFile(__dirname+"/public/json-viewer.css")
 })
 app.get("/caramelPuppy/scripts.js",(req,res)=>{
	res.sendFile(__dirname+"/public/scripts.js")
 })
 app.get("/caramelPuppy/data",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 res.send(logGetter())
	}
 })
 app.get("/caramelPuppy/deleteAll",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 deleteAll()
	 res.send("Ok")
	}
 })
}
