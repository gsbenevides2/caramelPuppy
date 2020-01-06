const {getTime} = require("./utils")
module.exports = function(setupReceived={},saveLog){
 const setup = {
	saveBody:setupReceived.saveBody || false
 }
 return function(req,error){
	const logData = {
	 date:getTime(),
	 type:"Request",
	 error
	}

	if(req){
	 logData.statusCode = req.statusCode
	 logData.method = req.request.method
	 logData.url = req.request.href
	 if(req.elapsedTime){
		logData.elapsedTime = req.elapsedTime
	 }/*
	if(statusCode !== 200 || setup.saveBody){
	 logData.body = req.body
	}*/
	}
	saveLog(logData)
 }
}
