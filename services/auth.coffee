passport = require("passport")
persistent = require("../persistant")

exports.use = (app) ->
  return

authenticate = (req, res) ->
  if req.body.id
    persistent.access("login").findById req.body.id, (err, login) ->
      unless err
        if login
          persistent.access("user").findById login.uid, (err, user) ->
            unless err
              if user
                user.logins += 1
                user.lastlogin = new Date
                user.save()
                res.send
                  auth: true
                  user:
                    name: user.name
                    communities: user.communities
                    id: user._id
              else
                login.remove()
                res.send
                  remove: true
        else
          res.send
            remove: true


  else if req.body.username and req.body.password
    persistent.access("user").findOne
      name: req.body.username.toLowerCase()
    , (err, user) ->
      unless err
        if user
          user.verify req.body.password, (verified) ->
            if verified 
              login = new persistent.access("login")(uid: user._id)
              login.save (err) ->
                unless err
                  user.logins += 1
                  user.lastlogin = new Date
                  user.save()
                  res.send
                    auth: true
                    assigned: login._id
                    user:
                      name: user.name
                      communities: user.communities
                      id: user._id
            else
             res.send
              auth: false
        else
          res.send
            auth: false


  else
    res.send error: "No body data"

exports.route = (app) ->
  app.post "/login", authenticate