var express     = require('express');
var bodyParser  = require('body-parser');

var app         = express();
var port        = process.argv[2] || 8282;

var hobbies     = ["coding", "gardening", "eating", "cat-parenting"];
var occupations = ["Security Technician", "Collections Manager", "Lead SEO Strategist", "Web Dev Mentor"];
var skills      = [
	{
		id         : 1,
		name       : 'Coding awesome stuff',
		experience : 'hooray-level'
	},
	{
		id         : 2,
		name       : 'Catching an arthropod',
		experience : 'pgood i guess'
	},
	{
		id         : 3,
		name       : 'Hatching',
		experience : 'pro'
	},
	{
		id         : 4,
		name       : 'marinating',
		experience : 'gangsta'
	}
];

app.use(bodyParser.json());
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
})

app.get('/name', function(req,res){
	res.send({name: "Eric"});
})

app.get('/location', function(req,res){
	res.send({location: "Provo, UT"});
})

app.get('/hobbies', function(req,res){
	if(req.query.order === "asc"){
		res.send({hobbies: hobbies.sort()});
	}else if(req.query.order === "desc"){
		res.send({hobbies: hobbies.sort().reverse()});
	}else{
		res.send({hobbies: hobbies});
	}
})

app.get('/occupations', function(req,res){
	if(req.query.order === "asc"){
		res.send({occupations: occupations.sort()});
	}else if(req.query.order === "desc"){
		res.send({occupations: occupations.sort().reverse()});
	}else{
		res.send({occupations: occupations});
	}
})

app.get('/occupations/latest', function(req,res){
	res.send({occupations: occupations[occupations.length - 1]});
})

app.get('/skills:id', function(req,res){
	var id = req.params.id;
	for(var i = 0; i < skills.length; i++){
		if(skills[i] === parseInt(id)){
			skills.splice(i,1);
		}
	}
	res.send({skills: skills})
})

app.listen(port)