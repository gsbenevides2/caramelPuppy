const path = require("path")

const expressSetup = require("./caramelPuppyExpress")
const caramelPuppyJson = require("./caramelPuppyJson")
const caramelPuppyRequest = require("./caramelPuppyRequest")
const logManager = require("./logManager")
const {getTime} = require("./utils")

module.exports = function(config={}){
 if(!config.__filename){
	throw new Error("Please pass the variable __filename")
 }
 else{
	logManager.fileName = path.basename(config.__filename)
 }
 if(config.express){
	expressSetup(config.express,c=>{
	 logManager.saveLog(c)
	},()=>{
	 logManager.caramelPuppyJson = caramelPuppyJson.load()
	 return logManager.caramelPuppyJson
	},()=>{
	 logManager.deleteAll()
	})
 }
 logManager.caramelPuppyJson = caramelPuppyJson.load()
 logManager.saveFunction =(content)=>{
	caramelPuppyJson.save(content)
 }
 function log(){
	const logData = {
	 date:getTime(),
	 type:"log",
	 logArguments:Array.from(arguments)
	}
	logManager.saveLog(logData)
 }
 
 function appStart(){
	logManager.saveLog({
	 date:getTime(),
	 type:"appStart"
	})
 }
 return {
	log,
	request:caramelPuppyRequest(config.request,logData=>{
	 logManager.saveLog(logData)
	}),
	appStart}
}
