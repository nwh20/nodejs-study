var express = require('express')
var app = express()
var bodyParser = require('body-parser')

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
    console.log(req.body.email)
    //check validation about input value => select DB
    var responseData = {'result' : 'ok', 'email' : req.body.email}
    res.json(responseData);
})