var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// database setting
var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '1234',
    database: 'node_study'
})

connection.connect()

// router
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/join.html'))
})

router.post('/', function(req, res) {
    var body = req.body
    var email = body.email
    var name = body.name
    var pw = body.password

    var sql = {email : email, name : name, pw : pw}
    var query = connection.query('insert into user set ?', sql, function(err, rows) {
        if(err) throw err
        res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId })
    })
})

module.exports = router