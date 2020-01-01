const {getTime} = require("./utils")
module.exports = function(setupReceived={},saveLog){
 const setup = {
	saveBody:setupReceived.saveBody || false
 }
 return function(req){
	const {statusCode} = req
	const {method} = req.request
	const url = req.request.url.href
	const logData = {
	 date:getTime(),
	 type:"Request",
	 statusCode,method,url
	}
	if(req.elapsedTime){
	 logData.elapsedTime = req.elapsedTime
	}
	if(statusCode !== 200 || setup.saveBody){
	 logData.body = req.body
	}
	saveLog(logData)
 }
}
