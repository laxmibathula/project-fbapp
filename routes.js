const express = require('express');
const router = express.Router();
var services = require("./services.js");
var STATIC_DIR = __dirname;

router.get('/home', function(req, res) {
  res.sendFile(STATIC_DIR + '/frontend/login-signup.html');
});

router.get('/table', function(req, res) {
  res.sendFile(STATIC_DIR + '/frontend/table.html');
});

// insert name, email , password in customers database table coming from client(html)
router.post("/fbpg",function(req,res){
    var fbv = req.body;
    console.log(fbv.ffname);
    console.log(fbv.flname);
    console.log(fbv.pass);
    console.log(fbv.email); 

  
    services.checkemail(fbv.ffname,fbv.email,fbv.pass).then(function(val){
          if(val.length!=0){ 
                 
                throw('cannot sav{se details / user already exists');
          }
          console.log("coming here");
          return services.insertvalues(fbv.ffname,fbv.email,fbv.pass);
          
        }).then(function(data){
            
            return res.status(200).send({status:'success'});
      
        }).catch(function(err){
             return res.status(400).send({status: err});
        })
         
});   


// checking email and password coming from client .if user is  there sending status back to client

router.post("/lgbt",function(req,res){
    var fbv = req.body;
  
    services.z(fbv.email,fbv.pass,function(raji,data){
      if(raji){
        return res.status(400).send({status:'invalid user'});
      }
      return res.status(200).send(data);
    })
  });


  // sending customer table all data to html

  router.get("/custmr",function(req,res){ 
          var fskip = 0; 
          var flimit = 1000;
          if(req.query.skip){
            fskip = req.query.skip;
          }
          if(req.query.limit){
            flimit = req.query.limit;
          }
                                                                                                                                                  
    services.f(flimit,fskip).then(function(results){
          //  console.log(results) 
           return res.status(200).send(results);
    }).catch(function(err){
            return res.status(400).send(err);
    });
});

// sending rows with same name as client entered
router.post("/get-customer",function(req,res){   
         var clientname = req.body; 
         console.log(clientname);
    services.names(clientname.name).then(function(results){
             //console.log(results) 
             return res.status(200).send(results);
    }).catch(function(err){
            return res.status(400).send(err);
    });
});

// deleting row by id 
router.delete("/remove-customer/:abc",function(req,res){ 
        var userid = req.params.abc;
        console.log("this is req.params.id =" +userid);
        services.deleteuser(userid).then(function(results){
          //console.log(results) 
          return res.status(200).send(results);
        }).catch(function(err){
             return res.status(400).send(err);
        });
})

// total rows count
router.get('/total-count',function(req,res){
  services.total().then(function(rows){
    console.log(rows); 
    return res.status(200).send(rows);
  }).catch(function(err){
    return res.status(400).send(err);
  })
})

// update customer name and address
router.post("/update-customer/:id",function(req,res){ 
     var  uid = req.params.id;
     var news = req.body;
     console.log(uid);
     console.log(news.newName);
     console.log(news.newAdd);

     services.update(news.newName,news.newAdd,uid).then(function(results){
           console.log(results) 
           return res.status(200).send(results);
     }).catch(function(err){
          return res.status(400).send(err);
     });
})

module.exports = router;
