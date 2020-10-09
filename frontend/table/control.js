var a = Cookies.get('user');
var n = JSON.parse(Cookies.get('user')).name;
console.log(a);
console.log(n);
console.log("raji");
document.getElementById('username').innerText = n;

var skip = 0; var limit = 10;
limitRows(skip,limit);

console.log("afdsgdgrmj");

function limitRows(skip,limit){    
    fetch(`/table-data?skip=${skip}&limit=${limit}`,{
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(list => {
            // spinneer icon  hide on success
            var i = document.getElementById('spin');
            i.style.display = "none";


             // )Create a variable to store HTML 
             let li = `<tr> <th>Id</th> <th>Name</th> <th>Address</th> <th>Email</th> <th>Password</th> <th>Delete</th> <th>Update</th> </tr>`; 
 
              // Loop through each data and add a table row 
            list.forEach(user => { 
             const jsonstring = (JSON.stringify(user)).trim();

             li += `<tr> 
            <td>`+user.id+`</td> 
            <td data-value="nname">`+user.name+`</td> 
            <td data-value="aaddress">`+user.address+`</td> 
            <td>`+user.Email+`</td> 
            <td>`+user.password+`</td>
            <td><button onclick="deleteUser(`+user.id+`,event)"><i style="color:#ff0000 ;" class="fas fa-user-slash"></i></button></td>
            <td><button data-user='${jsonstring}' class="update-btn" onclick="update(event)"><i style="color:#ffff66;font-size: 17px;" class="fas fa-pen-square"></i></button</td> 
            </tr>`; 
            }); 

           // Display result   
           document.getElementById("tableid").innerHTML = li; 

          // display table when data is fetched ( spinner icon "invissible")
           var ctable = document.getElementById('tableid');
           ctable.style.display = "visible";
    
        });
        document.getElementById("pre").addEventListener("click", function(){    
                   skip = skip - limit;
                   limitRows(skip,limit);
        }); 
        document.getElementById("next").addEventListener("click", function(){    
                   skip = skip + limit;
                   limitRows(skip,limit);
        });
  
}


function deleteUser(id,event){
  console.log(id);
  console.log("it z  event ", event);

  fetch('/remove-customer/'+id,{
      method:"delete"
  })
  .then(res =>{
      console.log(res)
      res.json()
  })
  .then(data => {
      console.log("its data = ", data);
           //event.srcElement.parentElement.parentElement.parentElement.remove();
                      // var current = window.event.srcElement;
                      //    //here we will delete the line
                      // while ( (current = current.parentElement)  && current.tagName !="TR");
                      //           // current.parentElement.removeChild(current);
                                
                      
                      var current = event.srcElement;
                         //here we will delete the line
                      while((current.tagName!="TR")){
                            current=current.parentElement; 

                      }
                      current.remove();
                      
  });
}

fetch('/total-count', {
    method: 'GET', // or 'PUT'   
})
.then(response => {
   return response.json();
})
.then(data => {       
  document.getElementById('input').innerText = data[0]['COUNT(*)'];       
}).catch(err =>{
    console.log(err);
});

function remove_cookie(){
  Cookies.remove('user', { path: '' }) // removed!
}


var activeRow = null;
var global_uid = null;

function update(event){
   
    activeRow = event.srcElement;

    var main = document.getElementsByClassName('main');
    main[0].style.display = "flex";

    let btnElement = event.srcElement;
    while(btnElement.tagName !== "BUTTON"){
        btnElement = btnElement.parentElement;
    }

    const jsonstring = btnElement.getAttribute('data-user');
    console.log(JSON.parse(jsonstring));
     
    // user row date  {id,name,address,etc etc}
    const userpars = JSON.parse(jsonstring);
    // console.log(userpars.name);

    var lname = userpars.name;
    var laddress = userpars.address;
    var uid;
    uid = userpars.id;
    global_uid = uid;
    console.log("id in upadate1 =",  global_uid);
      
    document.getElementById('lname').value = lname;
    document.getElementById('laddress').value = laddress;

    document.getElementById('cat').style.display = "none";
}
      
//-------------------------- model UPdate.........................
    
document.getElementById ("up").addEventListener("click", inupdate, false);

function inupdate() {        
  document.getElementById('cat').style.display = "flex";
    var newName =  document.getElementById('lname').value;
    var newAdd =  document.getElementById('laddress').value;
    // sending newName , new ADDRESS and id to server to upadate in customers table
    console.log("newname =", newName);
    console.log("newadd =", newAdd);
    console.log("inupdate2", global_uid);

    var allnew = {
      newName : newName,
      newAdd : newAdd
    };

  fetch('/update-customer/'+ global_uid, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allnew),
  })
  .then(response => {
      response.json();
      console.log(response);
  })
  .then(data => {
          global_uid = null;
          console.log('Success:', +data);

          // console.log("newname =", newName);
          // console.log("newadd =", newAdd);
                 
          // var trElement = activeRow;
          while((activeRow.tagName!="TR")){
              activeRow=activeRow.parentElement; 
          }
          // we found TR element ,now looping its children(td's)  // activeRow.children.length=7
          for(i=0; i < activeRow.children.length; i++){
                var td = activeRow.children[i];
                const tdType = td.getAttribute('data-value');
                 
                if(tdType === 'nname'){
                    td.innerText = document.getElementById('lname').value;
                }
                if(tdType === 'aaddress'){
                    td.innerText = document.getElementById('laddress').value;
                }
          }
          document.getElementsByClassName('main')[0].style.display = "none";

  })
  .catch((error) => {
        console.error('Error:', error);
  });
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
        
// When the user clicks on <span> (x), close the modal
var main = document.getElementsByClassName('main');
span.onclick = function(){
  main[0].style.display = "none";
}    
        
window.onclick = function(event){
  if(!event.target.closest('.box,.update-btn')){
    document.getElementsByClassName('main')[0].style.display = "none";
  }
}
    
// close the model when CLOSE button is clicked
document.getElementById ("cl").addEventListener("click", inClose, false);

function inClose(){
    document.getElementsByClassName('main')[0].style.display = "none";
}
