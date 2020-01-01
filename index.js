const path = require("path")

const expressSetup = require("./sloggerExpress")
const sloggerJson = require("./sloggerJson")
const sloggerRequest = require("./sloggerRequest")
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
	 logManager.sloggerJson = sloggerJson.load()
	 return logManager.sloggerJson
	},()=>{
	 logManager.deleteAll()
	})
 }
 logManager.sloggerJson = sloggerJson.load()
 logManager.saveFunction =(content)=>{
	sloggerJson.save(content)
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
	request:sloggerRequest(config.request,logData=>{
	 logManager.saveLog(logData)
	}),
	appStart}
}
