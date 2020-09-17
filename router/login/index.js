var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var passport = require('passport')
const { runInNewContext } = require('vm')
const { join } = require('path')
var LocalStrategy = require('passport-local').Strategy

// database setting
var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '1234',
    database: 'node_study'
})

connection.connect()

router.get('/', function(req, res) {
    var msg
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg
    res.render('login.ejs', {'message': msg})
})

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    done(null, id)
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        var query = connection.query('select * from user where email=?', [email], function(err, rows) {
            if(err) return done(err)
            if(rows.length) {
                return done(null, {'email': email, 'id': rows[0].UID})
            } else {
                return done(null, false, {'message': 'Your login info is not found.'})
            }
        })
    }
))

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err) res.status(500).json(err)
        if(!user) res.status(401).json(info.message)

        req.logIn(user, function(err) {
            if(err) return next(err)
            return res.json(user)
        })
    })(req, res, next)
})

module.exports = router