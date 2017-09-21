const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var readline =require('readline');


var app = express();


app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')


app.listen(3000, () => {
	console.log('listening on 3000')
})


app.get('/', (req, res) => {

		res.sendFile(__dirname + '/index.html')
	})

app.post('/parse', (req, res) => {
	console.log(req.body);

  //var readstream = fs.createReadStream(req.body.fromfile);
	var writestream = fs.createWriteStream(__dirname + req.body.tofile);

	var rd = readline.createInterface({
		input: fs.createReadStream(__dirname + req.body.fromfile),
		output: process.stdout,
		console: false
	});

writestream.once('open', function(fd){
	rd.on('line', function(line){
			var array = line.split(',');
			var chopParen = array[2].split('(')
			array[2] = chopParen[0].trim()
			if(array[3] === "Innistrad") {
				var chopSlash = array[2].split('/')
				array[2] = chopSlash[0].trim()
			}
			if(array[3] === "Eldritch Moon") {
				var chopSlash = array[2].split('/')
				array[2] = chopSlash[0].trim()
			}
			if(array[3] === "Shadows over Innistrad") {
					var chopSlash = array[2].split('/')
					array[2] = chopSlash[0].trim()
				}
				if(array[3] === "Dark Ascension") {
						var chopSlash = array[2].split('/')
						array[2] = chopSlash[0].trim()
					}
					if(array[3] === "Avacyn Restored") {
							var chopSlash = array[2].split('/')
							array[2] = chopSlash[0].trim()
						}
			console.log(array[2])
var newline = array.toString()
			console.log(newline);
			writestream.write(newline + "\n");
	});

});


	res.redirect('/')
})
