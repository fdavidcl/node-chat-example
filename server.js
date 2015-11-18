// Express
var express = require("express")
var app = express()
app.use(express.static('public'));

// HTTP server
var http = require("http").Server(app)

// Web Sockets
var io = require("socket.io")(http)

// Haml templating
var haml = require("haml"),
  fs = require("fs")
var layout = fs.readFileSync('layout.haml', 'utf8')

var data = {
  title: "Chat example",
  description: "Hi! This is an example Node.js app developed at the 'Brujería con Node' talk"
}

// Root HTTP request
app.get("/", function(req, res) {
  res.send(haml.render(layout, {locals: data}))
})

// WebSocket handlers
io.on("connection", function(socket) {
  console.log("Connected")

  // Event listener for 'msg'
  socket.on("msg", function(content) {
    io.emit("receive", content)
  })

  // Socket disconnection
  socket.on("disconnect", function() {
    console.log("User disconnected")
  })
})

// SERVER START!
http.listen(9090, function() {
  console.log("Magic happens in port 9090")
})
