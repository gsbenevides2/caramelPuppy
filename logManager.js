const chalk = require("chalk")

module.exports ={
 saverFunction:null,
 fileName:null,
 caramelPuppyJson:null,
 deleteAll(){
	this.caramelPuppyJson.logs = []
	this.saveFunction(this.caramelPuppyJson)
 },
 showLog(logData){
	switch(logData.type){
	 case "log":
		console.log.apply(null,[chalk.bgBlue.black("LOG")].concat(logData.logArguments))
		break;
	 case "Express":
		console.log(chalk.bgYellow.black("Express"),logData.period,logData.method,logData.url,logData.statusCode || "")
		break;	
	 case "Request":
		console.log(chalk.bgMagenta.black("Request"),logData.method,logData.statusCode,logData.url)
		break;	
	}
 },
 saveLog(logData){
	const showLogTypes=[
	 "log",
	 "Express",
	 "Request"
	]
	if(logData.type==="log"){
	 logData.logArguments = logData.logArguments.map((arg,pos)=>{
		if(typeof agr !== "object") return arg
		else{
		 try{
			JSON.stringify(arg)
		 }
		 catch(e){
			message = `CaramelPuppy:Error making JSON.stringify() from argument ${pos}. Avoid using complex objects with Date, Url etc.`
			console.error(message)
			return ""
		 }
		}
	 })/*
	 console.log(chalk.bgBlue.black("LOG"), logData.logArguments.map(arg=>{
		if(typeof arg !== "object") return arg
		else return JSON.stringify(arg,null,2)
	 }).join(" "))*/
	}
	if(showLogTypes.includes(logData.type)) this.showLog(logData)
	logData.fileName = this.fileName
	this.caramelPuppyJson.logs.push(logData)
	this.saveFunction(this.caramelPuppyJson)
 }
}
