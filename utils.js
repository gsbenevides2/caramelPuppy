module.exports = {
 getTime(){
	const time = new Date()
	return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()+1}:${time.getMinutes()+1}:${time.getSeconds()+1}`
 }
}

