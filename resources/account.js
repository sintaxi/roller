var base = require("../base")

exports.new = function(req, rsp){
  rsp.render("accounts/new", { 
    current_user: req.current_user, 
    account: {}, 
    errors: null
  })
}

exports.edit = function(req, rsp){
  base.rolodex.account.get(req.session.account, function(account){
    rsp.render("accounts/edit", { 
      current_user: req.current_user, 
      account: account, 
      errors: null
    })
  })
}

exports.put = function(req, rsp){
  base.rolodex.account.update(req.session.account, req.body.account, function(errors, account){
    if(errors){
      rsp.render("accounts/edit", { 
        current_user: req.current_user, 
        account: account || req.body.account, 
        errors: errors || null
      })
    }else{
      rsp.redirect("/dashboard")
    }
  })
}

exports.post = function(req, rsp){
  base.rolodex.account.create(req.body.account, function(errors, account){
    if(errors){
      rsp.render("accounts/new", {
        current_user: req.current_user, 
        errors: errors,
        account: req.body.account || {}
      })
    }else{
      req.session.account = account.id
      rsp.redirect("/account/edit")
    }
  })
}
