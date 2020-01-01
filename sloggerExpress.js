const setupHttpWebClient = require('./httpWebClient')
require("dotenv").config()
const {getTime} = require("./utils")

module.exports = function(app,logSaver,logGetter,deleteAll){
 const key = process.env.SLOGGER_KEY
 if(key){
	setupHttpWebClient(app,key,logGetter,deleteAll)
 }
 setupMiddleware(app,logSaver)
}
function setupMiddleware(app,logSaver){
 app.use((req,res,next)=>{
	const end = res.end
	const {url,method} = req
	logSaver({
	 date:getTime(),
	 period:"Start",
	 type:"Express",
	 method,
	 url
	})
	res.end=(a,b)=>{
	 const statusCode = res.statusCode
	 logSaver({
		date:getTime(),
		period:"End",
		type:"Express",
		method,
		url,
		statusCode
	 })
	 res.end = end
	 res.end(a,b)
	}
	next()
 })
}
function setupWebInterface(app){
}
