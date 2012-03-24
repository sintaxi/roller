var base = require("../base")

exports.redirect = function(req, rsp, next){
  if(req.session.account){
    rsp.redirect("/dashboard")
  }else{
    next()
  }
}

exports.current_user = function(req, rsp, next){
  if(req.session.account){
    base.rolodex.account.get(req.session.account, function(account){
      req.current_user = account
      next()
    })
  }else{
    req.current_user = null
    next()
  }
}

exports.authenticate = function(req, rsp, next){
  if(req.session.account){
    next()
  }else{
    rsp.render("sessions/edit", {
      status: 401,
      account: {},
      errors: null
    })
  }
}
