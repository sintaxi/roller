var fs = require("fs")
var express = require("express")
var RedisStore = require('connect-redis')(express)
var redis = require("redis")
var redisClient = redis.createClient()
var rolodex = require("../../Modules/node-rolodex")(redisClient)

var app = express.createServer()

app.configure(function(){
  //app.set("config", JSON.parse(fs.readFileSync("./config/#{ app.settings.env }.json")))
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat", store: new RedisStore }));
  app.use(express.logger({ format: '[:date] :status :method :url' }))
  app.use(express.methodOverride())
  app.use(express.static(__dirname + '/public'))
})

exports.notFound = function(req, rsp){ 
  rsp.send(helpers.pretty({"errors": ["Not Found"]}), 404)
}

exports.redisClient = redisClient
exports.rolodex = rolodex
exports.express = express
exports.app = app
