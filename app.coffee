###
Module dependencies.
###
express = require("express")
routes = require("./routes")
http = require("http")
path = require("path")
lessMW = require("less-middleware")
persistent = require("./persistant")
services = require("./services").services
app = express()
persistent.connect()
app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  services.auth.use app
  app.use express.methodOverride()
  app.use app.router
  app.use lessMW(
    src: path.join(__dirname, "public")
    compress: true
  )
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()

app.get "/", routes.index
app.get "/persistent/:type/:id?", persistent.get
app.post "/persistent/:type", persistent.post
app.put "/persistent/:type/:id", persistent.put
services.auth.route app
server = http.createServer(app)
services.io.init server
server.listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")