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
router.get('/list', function(req, res) {
    res.render('movie.ejs')
})

router.get('/', function(req, res) {
    var responseData = {}

    var query = connection.query('select title from movie', function(err, rows) {
        if(err) throw err;
        if(rows.length) {
            responseData.result = 1
            responseData.data = rows
        } else {
            responseData.result = 0
        }
        res.json(responseData)
    })
})

module.exports = router