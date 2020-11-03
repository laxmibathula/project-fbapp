require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./routes.js")
const app = express();

const STATIC_DIR = __dirname;
app.use(express.static(STATIC_DIR));

app.use(cors());
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

app.use("/",routes);


app.listen(process.env.PORT,function(){
	console.log(`Server started running at port:${process.env.PORT}`);
});
