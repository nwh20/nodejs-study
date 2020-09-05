var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '1234',
    database: 'node_study'
})

connection.connect()

app.listen(3000, function() {
    console.log('port 3000')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs') //this project contains ejs for Express templete

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/main.html')
})

app.get('/main', function(req, res) {
    res.sendFile(__dirname + '/public/main.html')
})

app.post('/email_post', function(req, res) {
    res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res) {
    var email = req.body.email
    var responseData = {}

    var query = connection.query('select name from user where email="' + email +'"', function(err, rows) {
        if (err) throw err;
        if (rows[0]) {
            responseData.result = 'ok';
            responseData.name = rows[0].name;
        } else {
            responseData.result = 'none';
            responseData.name = '';
        }
        res.json(responseData);
    })
})