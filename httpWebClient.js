const fs = require("fs")

module.exports = (app,credential,logGetter,deleteAll)=>{
 if(!app){
	app = require("express")()
 }
 if(!credential) credential = "null"
 app.get("/slogger",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 res.sendFile(__dirname+"/public/index.html")
	}
 })
 app.get("/slogger/json-viewer.js",(req,res)=>{
	res.sendFile(__dirname+"/public/json-viewer.js")
 })
 app.get("/slogger/json-viewer.css",(req,res)=>{
	res.sendFile(__dirname+"/public/json-viewer.css")
 })
 app.get("/slogger/scripts.js",(req,res)=>{
	res.sendFile(__dirname+"/public/scripts.js")
 })
 app.get("/slogger/data",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 res.send(logGetter())
	}
 })
 app.get("/slogger/deleteAll",(req,res)=>{
	if(req.query.credential !== credential){
	 res.status(401).send("Invalid Credential")
	}
	else{
	 deleteAll()
	 res.send("Ok")
	}
 })

}
