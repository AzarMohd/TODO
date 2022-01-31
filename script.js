//getting all recquired elements
const inputBox  =document.querySelector(".inputfield input");
const addBtn  =document.querySelector(".inputfield button");
const todolist  =document.querySelector(".todolist");
const deleteAllBtn =document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
	let userData = inputBox.value;//getting ser entered value
	if(userData.trim() != 0) { //if user values aren't only spaces
	addBtn.classList.add("active");//active the add button
	}
	else{
		addBtn.classList.remove("active");//unactive the add button
	}
}

//if user click the add button
addBtn.onclick = ()=>{
	let userData = inputBox.value;//getting ser entered value
	let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
	if(getLocalStorage == null){//if local storage is null
		listArr = [];//creating blank array
	}
	else{
		listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
	}
	listArr.push(userData);//pushing or adding user data
	localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string
	showTasks();//calling showTasks
	addBtn.classList.remove("active");//unactive the add button
}
//FUNCTION TO ADD TASK INSIDE UL
function showTasks(){
	let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
	if(getLocalStorage == null){//if local storage is null
		listArr = [];//creating blank array
	}
	else{
		listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
	}
	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = listArr.length;//passing the length value into pendingNumb
	if(listArr.length > 0){//if array length is greater than 0 
		deleteAllBtn.classList.add("active");//active the clearall button
	}else{
		deleteAllBtn.classList.remove("active");//unactive the clearall button
	}
	let newLiTag ="";
	listArr.forEach((element,index) =>{
		newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;	
	});
	todolist.innerHTML = newLiTag; //adding new li tag
    inputBox.value ="";//once task added leave the input field 
}

//DELETE TASK FUNCTION
function deleteTask(index){
	let getLocalStorage = localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index,1);//delete or emove the particular index li
	//after remove that again create a local space
	localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
	showTasks();//calling showTasks
}

//delete all tasks function
deleteAllBtn.onclick = ()=>{
	listArr = [];//empty an array
	//adter delete all task again update the local storage
	localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
	showTasks();//calling showTasks
}

//clock javascript
function updateClock(){
  var now =  new Date();
  var dname = now.getDay();
      mo = now.getMonth();
      dnum = now.getDate();
      yr = now.getFullYear();
      hou= now.getHours();
      min = now.getMinutes();
      sec = now.getSeconds();
      pe = "AM";
     if(hou == 0){

     	hou = 12;
     }
     if(hou > 12){

     	hou = hou-12;
     	pe = "PM";
     }
     Number.prototype.pad = function(digits) {
       for ( var n = this.toString(); n.length < digits; n = 0 + n);
     	return n;
     }

      var months =["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
      var week =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var ids =["dayname","month","daynum","year","hour","minutes","seconds","period"];
      var values = [week[dname],months[mo],dnum.pad(2),yr.pad(2),hou.pad(2),min.pad(2),sec.pad(2),pe];
      for(var i=0;i<ids.length;i++)
      	document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock(){
	updateClock();
	window.setInterval("updateClock()",1);
}