const fs = require("fs")
const path = require("path")

module.exports = {
 sloggerJsonPath:null,
 load(){
	this.sloggerJsonPath = path.format({
	 dir:process.cwd(),
	 base:"slogger.json"
	})
	if(fs.existsSync(this.sloggerJsonPath)){
	 const sloggerJsonBuffer = fs.readFileSync(this.sloggerJsonPath)
	 try{
		return JSON.parse(sloggerJsonBuffer.toString())
	 }
	 catch(e){
		console.log(e.message)
		throw new Error("Error reading slogger.json")
	 }
	}
	else{
	 return {
		logs:[]
	 }
	}
 },
 save(sloggerContent){
	if(this.sloggerJsonPath){
	 fs.writeFileSync(this.sloggerJsonPath,JSON.stringify(sloggerContent))
	}
 }
}
