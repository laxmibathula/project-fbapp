if(Cookies.get('user')){
	window.location.href = "/table";
}
  
function signUp(){
   var ffname = document.getElementById('fname').value;
   var flname = document.getElementById('lname').value;
   var tname = /^[A-Za-z .]{3,20}$/

   var email = document.getElementById('eml').value;
   var emm = /^[a-zA-Z.-]{3,}@[A-Za-z]{3,}[.]{1}[a-zA-Z.]{2,6}$/

   var pass = document.getElementById('pd').value;
   var pasd =/^[\w@_-]{4,10}$/
   

   if(tname.test(ffname)== false){
	document.getElementById("fname").style.border= " 2px solid red ";
	return false;
   }
   else if(tname.test(flname)==false){
	document.getElementById("lname").style.border= " 2px solid red ";
	return false;
   }
   else if(emm.test(email)==false){
	document.getElementById("eml").style.border= " 2px solid red";
	document.getElementById("em").style.visibility= "visible";
    return false;
   }

   else if(pasd.test(pass)==false){
    document.getElementById("pd").style.border= " 2px solid red";
	document.getElementById("sp").style.visibility= "visible";
    return false;
   }

  else
   { 
        var a = document.getElementById('rm').checked; 
		var b = document.getElementById('rf').checked; 
		var c = document.getElementById('ro').checked; 
        
		if(a == false && b == false && c==false){
			
			document.getElementById('genid').innerHTML=" ** please check anyone button";
			 return false;
		}
		else{
			
		}      
    }           

			
	var abc = {
        ffname : ffname,
		flname : flname,
        email: email,
		pass : pass 
    };

		   
   fetch('/signup', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(abc),
    })
    .then(response => response.json())
    .then(data => {
     	console.log('Success:', data);
    })
    .catch((error) => {
    	console.error('Error:', error);
    });        
}

function logIn(){
	var email = document.getElementById('lgemail').value;
	var pass = document.getElementById('lgpwd').value;

	var abc = {
            email: email,
			pass : pass 
        };

     console.log(abc)
	
	fetch('/login', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(abc),
    })      
	.then(function(response){
			console.log(response);
		    if(response.status == 400){
			    alert("invalid user");
			    event.preventDefault();
			
	        }
	      else { 
		    return response.json();
		    }
   }).then(function(data){
				console.log("coming here");
				console.log(data);
				console.log(data[0].name);

				// var jc = JSON.stringify(abc);
			    Cookies.set('user',JSON.stringify({email:email,pass:pass,name:data[0].name}), { expires: 7 , path: ''});   
                var ck = Cookies.get('user') // => 'value' 
			    console.log(ck); 
			 
			   var e = JSON.parse(Cookies.get('user')).email
			   var n = JSON.parse(Cookies.get('user')).name
			   console.log(e);
			   console.log(n);

			   window.location.href = "/table";

				//  if(Cookies.get('user')){   window.location.href = "/table";
				    
				// }
	}).catch(function(error){
		alert("somthing went wrong");
				console.log(error);	
	});
}      
  