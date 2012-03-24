var base = require("../base")

// login form
exports.edit = function(req, rsp){
  rsp.render("sessions/edit", {
    current_user: req.current_user, 
    account: {}, 
    errors: null
  })
}

// logs in
exports.put = function(req, rsp){
  base.rolodex.account.authenticate({ email: req.body.account.email }, req.body.account.password, function(errors, account){
    if(errors){
      rsp.render("sessions/edit", {
        current_user: req.current_user, 
        account: req.body.account || {}, 
        errors: errors,
      })
    }else{
      req.session.account = account.id
      rsp.redirect("/dashboard")
    }
  })
}

// logout
exports.del = function(req, rsp){
  req.session.account = null
  rsp.redirect("/login")
}
