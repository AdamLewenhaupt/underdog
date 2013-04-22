passport = require("passport")
persistent = require("../persistant")
local = require("passport-local")
passport.use new local.Strategy((name, pass, done) ->
  persistent.access("user").findOne
    name: name
    password: pass
  , (err, user) ->
    done err, user

)
exports.use = (app) ->
  app.use passport.initialize()

authenticate = (req, res) ->
  if req.body.id
    persistent.access("login").findById req.body.id, (err, login) ->
      unless err
        persistent.access("user").findById login.uid, (err, user) ->
          unless err
            res.send
              auth: true
              user:
                name: user.name
                communities: user.communities
                id: user._id



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
                  res.send
                    auth: true
                    assigned: login._id
                    user:
                      name: user.name
                      communities: user.communities
                      id: user._id


  else
    res.send error: "No body data"

exports.route = (app) ->
  app.post "/login", authenticate