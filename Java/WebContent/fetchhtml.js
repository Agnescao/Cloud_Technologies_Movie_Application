function getHTTPObject() {
	var xhr = false;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	}
	return xhr;
}

function grabFile() {
	
	//Construct an XMLHttpRequest object	
	var request = getHTTPObject();
	var url="http://localhost:8080/LeiCao-A00215492-Client/rest/movie";
	//If object creation was successful, set up and make request
	if (request) {
		request.onreadystatechange = function() {
			parseResponse(request);
		};
		
		request.open("GET", url, true);
		request.setRequestHeader('Accept','application/json');
		request.send(null);
	}
}

var arr;
var li1;
var a1;
function parseResponse(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
		
			arr = JSON.parse(request.responseText);
			 console.log(arr);
			 console.log(arr.employee.length);
			 var ul1=document.createElement("ul");
			 for(var i=0; i<arr.employee.length;i++){
				 var id=arr.employee[i].id;
				 console.log(id);
				 var firstName=arr.employee[i].firstName;
				 console.log(firstName);
				 var lastName=arr.employee[i].lastName;
				 var dateOfBirth=arr.employee[i].dob;
				 console.log(dateOfBirth);
				 var email=arr.employee[i].email;
				 var gender=arr.employee[i].gender;
				 
				  li1=document.createElement("li");
				  a1=document.createElement("a");
				  a1.setAttribute("href","#file");
				  a1.setAttribute("onclick","getdetails("+ i +")");
				  a1.innerHTML=firstName+" "+lastName;
				  console.log(a1.innerHTML);
				  li1.appendChild(a1);
				 console.log(li1);
				 ul1=document.getElementById("name");
				 ul1.appendChild(li1);
				 console.log(ul1);
				 
			}
			 
			 
		   
			
		}
	}
	
}
function getdetails(id){
	var div1=document.createElement("div");
	
	var h3=document.createElement("h3");
	h3.innerHTML="Movie Details"
	div1.appendChild(h3);
   var ul=document.createElement("ol");
	 
	 var li1=document.createElement("li");
	 li1.innerHTML="ID                           :"+arr.employee[id].id;
	 
	 var li2=document.createElement("li");
	 li2.innerHTML="Email                        :"+arr.employee[id].email;
	 
	 var li3=document.createElement("li");
	 li3.innerHTML="Date of Birth :"+arr.employee[id].dob;
	 console.log(li3.innerHTML);
	 
	 var li4=document.createElement("li");
	 li4.innerHTML="Gender                         :"+arr.employee[id].gender;
	
	 ul.appendChild(li1);
	 ul.appendChild(li2);
	 ul.appendChild(li3);
	 ul.appendChild(li4);
	 div1.appendChild(ul);
	 
	 /*div1.textContent="";*/
	 var details=document.getElementById("result");
	 details.innerHTML="";
	 details.appendChild(div1);
	  
}
function prepareLinks()
{
	var links = document.getElementsByTagName("a");
	
    for (var i=0; i<links.length; i++){
		links[i].onclick=function(){
			grabFile(this);
			return false;
		}
    }
}

window.onload=function(){
	grabFile();
}


