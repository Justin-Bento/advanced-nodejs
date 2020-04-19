const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

let dbName = 'notetaking';
const connection = mysql.createConnection({
	user: 'root',
	password: 'root',
	host: 'localhost',
	port: 8889,
	database: dbName
});

connection.connect((err) => {
	if (err) throw err;
	console.log(`Connected to Database ${dbName}`);
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.get('/notes', function(req, res) {
	res.render('notes');
});

router.post('/sent-contact-data', function(req, res) {
	var username = req.body.name;
	var useremail = req.body.email;
	var usermessage = req.body.message;
	let sql = `INSERT INTO contact(name, email, message) VALUES ("${username}", "${useremail}", "${usermessage}")`;
	connection.query(sql);
	console.log(sql);

	res.writeHead(302, {
		Location: '/contact'
	});
	res.end();
});

router.post('/sent-message', function(req, res) {
	var noteTitle = req.body.title;
	var notMessage = req.body.notes;
	let sql = `INSERT INTO pages(title, message) VALUES ("${noteTitle}", "${notMessage}")`;
	connection.query(sql);
	console.log(sql);

	res.writeHead(302, {
		Location: '/notes'
	});
	res.end();
});

app.use('/', router);

let port = 5000;
app.listen(port);

console.log(`Running at http://localhost:${port}/`);
