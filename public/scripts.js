// navbar
const navbar = new Vue({
 el:"#navbar",
 data:{
	screenname:"Dashboard"
 },
 template:`
 <nav>
	<div class="nav-wrapper">
	 <a class="brand-logo">{{screenname}}</a>
	 <ul class="right">
		<a class="dropdown-trigger" data-target="dropdown-navbar">
		 <i class="material-icons">more_vert</i>
		</a>
	 </ul>
	</div>
 </nav>
 `
})
// dropdown
const dropdown = new Vue({
 el:"#dropdown",
 methods:{
	deletar(){
	 if(confirm("Tem certeza?\nEssa ação é irreversivel!!")){
		const credential = (new URL(window.location.href)).searchParams.get("credential")
		fetch(`/slogger/deleteAll?credential=${credential}`)
		 .then(loadLogs)
	 }
	 else{}
	}
 },
 mounted(){
	M.Dropdown.init(document.querySelector(".dropdown-trigger"))
 },
 template:`
 <ul id="dropdown-navbar" class="dropdown-content">
	<li @click="deletar">Deletar todos os logs</li>
 </ul>
 `
})
// logs
const logs = new Vue({
 el:"#logs",
 data:{
	list:[],
	makeIconType(type){
	 const types = {
		appStart:"play_arrow",
		Express:"http",
		Request:"send",
		log:"info_outline"
	 }
	 return types[type]
	},
	makeTextMessage(log){
	 const types={
		appStart:"appStart",
		Express:`${log.method} ${log.url}`,
		log: `${log.logArguments?log.logArguments.join(" ") : ""}`,
		Request:`${log.method} ${log.url}`
	 }
	 return types[log.type]
	}
 },
 methods:{
	open:(a,b)=>log.open(a,b)
 },
 template:`
 <div class="row">
	<div class="col s12">
	 <table class="col s12">
		<thead><tr>
		 <th>Type</th>
		 <th>Message,Url,Error</th>
		</tr></thead>
		<tbody>
		 <tr @click="open(log,index)" v-for="(log,index) in list">
			<td class="material-icons">{{makeIconType(log.type)}}</td>
			<td>{{makeTextMessage(log)}}</td>
		 </tr>
		 <!--tr>
			<td class="material-icons">http</td>
			<td>GET / 200</td>
		 </tr>
		 <tr>
			<td class="material-icons">info_outline</td>
			<td>Ativado http</td>
		 </tr>
		 <tr>
			<td class="material-icons">play_arrow</td>
			<td>appStart</td>
		 </tr>
		 <tr>
			<td class="material-icons">send</td>
			<td>GET googleapis.com 200</td>
		 </tr>
		 <tr class="red lighten-2">
			<td class="material-icons">error_outline</td>
			<td>Erro: id is undefined</td>
		 </tr-->
		</tbody>
	 </table>
	</div>
 </div>
 `
})
// log
const log = new Vue({
 el:"#log",
 data:{
	jsonViewer:new JSONViewer(),
	logIndex:0
 },
 methods:{
	open(log,index){
	 this.logIndex=index
	 this.jsonViewer.showJSON(log)
	 this.modal.open()
	},
	getLog(logNumber){
	 if(logNumber >=0 && logNumber !== logs.list.length){
		this.logData = logs.list[logNumber]
		this.logIndex = logNumber
	 }
	}
 },
 mounted(){
	this.$refs.json.appendChild(this.jsonViewer.getContainer());
	this.modal = M.Modal.init(this.$el)
 },
 updated(){
	console.log(this.logIndex)
 },
 template:`
 <div class="modal modal-fixed-footer">
	<div class="modal-content">
	 <h4>Log View</h4>
	 <div ref="json"></div>
	</div>
	<div class="modal-footer center-align">
	 <a @click="getLog(logIndex-1)" class="waves-effect btn-flat left"><i class="material-icons">arrow_back</i></a>
	 <a class="modal-close btn-flat waves-effect">Sair</a>
	 <a @click="getLog(logIndex+1)" class="waves-effect btn-flat right"><i class="material-icons">arrow_forward</i></a>
	</div>
 </div>
 `
})
function loadLogs(){
 const credential = (new URL(window.location.href)).searchParams.get("credential")
 fetch(`/slogger/data?credential=${credential}`)
	.then(async res=>{
	 logs.list = (await res.json()).logs.reverse()
	})
}
loadLogs()
