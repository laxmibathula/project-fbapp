var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "raji1991",
    database: "mydb"
  });
  //console.log("coming here");
//...............................................................................

// full customer table 
const f = function(flimit,fskip){
               return new Promise(function(resolve,reject){
                      console.log(flimit);
                      console.log(fskip);
                      var query = `select * from customers limit ${flimit} offset ${fskip}`;
                      console.log(query);
                      con.query(query,function(err,results){
                            if(err){
                               reject(err);
                               return ;
                            }
                            resolve(results);
                        })  
                }) 
}

// total count
const total = function(){
  return new Promise(function(resolve,reject){
         con.query('SELECT COUNT(*)  FROM customers',function(err,results){
               if(err){
                  reject(err);
                  return ;
               }
               resolve(results);
              //  console.log(results);
           })  
   }) 
}
// update name and address 
const update = function(uname,uadd,uid){
      return new Promise(function(resolve,reject){
           con.query('UPDATE Customers  SET name = ?, address = ? WHERE id = ?',[uname,uadd,uid],function(err,result){
                  if(err){
                    console.log("im in error");
                    reject(err);
                    return;
                  }
                  resolve(result);
                  console.log("im in result");
                  console.log(result.affectedRows + " record(s) updated");
            })
 
      })
}


const insertvalues = function(a,b,c) {
        return new Promise(function(resolve,reject){
           var sql = "INSERT INTO customers (name, email , password) VALUES ?";
           var values = [[ a,b,c ]];
           con.query(sql, [values], function (err, result) {
             if(err){
               reject(err);
               return;
             } 
             resolve(result);
             console.log("Number of records inserted: " + result.affectedRows);
           });
       }) 
     }   
   
const checkemail = function(cname,cemail,cpass){
      return new Promise(function(resolve,reject){
             
                 con.query('select * from customers where email = ?',[cemail],
                     function(err,results){
                         if(err){
                              reject(err);
                              return;
                          }
                          resolve(results);
                })

      })
}
     

const z = function(x,y,callback){
  console.log(x);
  console.log(y);
  con.query('SELECT * FROM customers WHERE email = ? OR password = ?',[x,y],
   function(err,results){
     if(err){
       console.log(err);
       callback(err,null);
       return;
     }
     console.log("------------------------start-----------------------------------");
     console.log(Array.isArray(results));
     if(results.length == 0){
       callback("fufufyufiy",null);
       return;
     }

     callback(null,results);
   }
  );
}
         
// name route which sends all rows with same name
const names = function(a){
       
       return  new Promise(function(resolve,reject){

              con.query('select * from customers where name = ?',[a],
              
                         function(err,result){
                             if(err){
                                reject(err);
                                console.log("im in err query")
                                 return;
                            }
                           resolve(result);
                           console.log("im in result query");
                           console.log(result);
                          
                          })
      })                  
}


const deleteuser = function(id){

  return  new Promise(function(resolve,reject){
    con.query('delete from customers where id = ?',[id],
                 function(err,result){
                   if(err){
                     reject(err);
                     return;
                   }
                   resolve(result);
                  //  console.log("im coming from result query =",+result.affectedRows);
            })

    })
}

// const  hundred = function(){

//        var userList = [];
//        for(var i=0; i<50; i++){
//           userList.push(['raji'+i,'51111'+i, 'raji' + i + '@gmail.com','123'+i])
       
//        con.query('insert into customers(name,address,Email,password) VALUES ?', userList,
//        function(err,records){
//          if(err){
//            console.log(err);
//          }
//          console.log(records.affectedRows);
//        })
//   }
//}

module.exports= {f,insertvalues,z,names,deleteuser,checkemail,total,update};