const fs = require("fs")
const path = require("path")

module.exports = {
 caramelPuppyJsonPath:null,
 load(){
	this.caramelPuppyJsonPath = path.format({
	 dir:process.cwd(),
	 base:"caramelPuppy.json"
	})
	if(fs.existsSync(this.caramelPuppyJsonPath)){
	 const caramelPuppyJsonBuffer = fs.readFileSync(this.caramelPuppyJsonPath)
	 try{
		return JSON.parse(caramelPuppyJsonBuffer.toString())
	 }
	 catch(e){
		console.log(e.message)
		throw new Error("Error reading caramelPuppy.json")
	 }
	}
	else{
	 return {
		logs:[]
	 }
	}
 },
 save(caramelPuppyContent){
	if(this.caramelPuppyJsonPath){
	 fs.writeFileSync(this.caramelPuppyJsonPath,JSON.stringify(caramelPuppyContent))
	}
 }
}
