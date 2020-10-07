require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const things = require("./routes.js")
const app = express();
var STATIC_DIR = __dirname;
var services = require("./services-fb1.js");

app.use(express.static(STATIC_DIR));
console.log( __dirname);

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

function isJsonParsable(json) { 
	try{
		JSON.parse(json);  
	}catch(e){
		return false;
	}      
  
	return true;z
};

app.use(function(req, res, next) {
	if(req.text && isJsonParsable(req.text)){
		req.body = JSON.parse(req.text);
	}

	if(req.body && typeof(req.body) === "string" && isJsonParsable(req.body)){
		req.body = JSON.parse(req.body);
	}

	next();
});

app.use("/",things);

var add = 2+2;
console.log(add);

app.listen(process.env.PORT,function(){
	console.log(` port running at ${process.env.PORT}`);
});

// var a=8086;
// app.listen(a,function(){
// 	console.log(" port running at" +a);
// });

//--------------------------------------- git hub pushing---------------------------------
// 1.git add -A
// 2.git commit -m "chaned variable name"
// 3.git push origin master
// 4.git pull origin master


//-----------------------------------------------------------------------------

// app.get('/custmr',function(req,res){
//    dbcall(function(data){
//      return res.send(data);
//    });
// });
 
// function dbcall(abc){
//   con.query('select * from customers',function(err,results){
//       if(err){
//           abc(err);
//           return ;
//       }
//       abc(results);
//   });  
// } 

//------------------------------------------------------------------------------
  

//  get all customers   (from google link)

// app.get('/custmr',(req,res)=>{
//   con.query('SELECT * FROM customers',(err,rows,fields)=>{
//     if(!err){
//       res.send(rows);
//     }
//     else
//       console.log(err);
//   })

// });  

//---------------------------------------------------------------------------

// app.get("/custmr",function(req,res){                                          
                                                                                                               
//    dbcall(function(data){
//       return res.status(200).send(data);
//    },function(err){
//        return res.status(400).send({status:'invalid user'});
//    });
// });

// function dbcall(sucsessfn,errfn){
//   con.query('select * from customers',function(err,results){
//       if(err){
//         errfn(err);
//           return;
//       }
//       sucsessfn(results);
//   })  
// }; 


//---------------------------------------------------------------------------


// app.get("/custmr",function(req,res){  
//    new Promise(function(resolve,reject){
//          con.query('select * from customers',function(err,results){
//                  if(err){
//                      reject(err);
//                   }
//                  resolve(results);
//           })  

//     }).then(function(rslt){
//        return res.status(200).send(rslt);
//     }).catch(function(err){
//        return res.status(400).send({status:'invalid user'});
//     })
// })

//----------------------------------------------------------------------------------

// posting name, email , password in customers table coming from client(html)

// app.post("/fbpg",function(req,res){
//     var fbv = req.body;
//     console.log(fbv.ffname);
//     console.log(fbv.flname);
//     console.log(fbv.pass);
//     console.log(fbv.email); 
    
//     res.send({ status:"welcome to raji's page"});

//     callfun(fbv.ffname,fbv.email,fbv.pass);
// });

// function callfun(a,b,c) {
//   var sql = "INSERT INTO customers (name, email , password) VALUES ?";
//   var values = [[ a,b,c ]];

//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
// }

