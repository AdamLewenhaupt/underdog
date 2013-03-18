mongoose = require("mongoose")
models = require("./models").models
exports.connect = ->
  console.log "Connecting to database."
  mongoose.connect "mongodb://main:access@linus.mongohq.com:10026/underdog-main", (err) ->
    console.log err  if err


exports.get = get = (req, res) ->
  type = req.params.type
  id = req.params.id
  unless models[type]
    res.send error: "invalid type"
    return
  models[type].get id, (retval) ->
    res.send retval


exports.post = post = (req, res) ->
  type = req.params.type
  data = req.body
  unless models[type]
    res.send error: "invalid type"
    return
  models[type].post data, (retval) ->
    res.send retval


exports.put = put = (req, res) ->
  type = req.params.type
  id = req.params.id
  unless models[type]
    res.send error: "invalid type"
  else
    models[type].put id, req.body, (retval) ->
      res.send retval


exports.access = access = (model) ->
  models[model].model