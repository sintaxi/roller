var base = require("./base")
var app = base.app
var middleware = require("./lib/middleware")
var port = process.env.PORT || 8001 

var account = require('./resources/account')
var sessions = require('./resources/sessions')

var unprotected = [middleware.current_user]
var protected   = [middleware.current_user, middleware.authenticate]

app.get("/signup", middleware.redirect, unprotected, account.new)
app.post("/signup", unprotected, account.post)

app.get("/account/edit", protected, account.edit)
app.put("/account/edit", protected, account.put)

app.get("/login", middleware.redirect, unprotected, sessions.edit)
app.put("/login", unprotected, sessions.put)
app.get("/logout", unprotected, sessions.del)

app.get("/dashboard", protected, function(req, rsp){
  rsp.render("dashboard.jade", {
    current_user: req.current_user
  })
})

app.get("/", middleware.redirect, unprotected, function(req, rsp){
  rsp.render("index.jade", {
    current_user: req.current_user
  })
})

app.listen(port)
console.log("listening on port", port)

