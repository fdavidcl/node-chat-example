var serviceURL = document.URL
var socket = io.connect(serviceURL)

socket.on("connect", function() {
  var chatobj = document.getElementById("chat")
  chatobj.innerHTML = chatobj.innerHTML + "<br />" + "Conectado al servidor"
  chatobj.scrollTop = chatobj.scrollHeight
})

socket.on('receive', function(msg) {
  var chatobj = document.getElementById("chat")
	chatobj.innerHTML = chatobj.innerHTML + "<br />" + msg
	chatobj.scrollTop = chatobj.scrollHeight
})

socket.on('disconnect', function() {
  var chatobj = document.getElementById("chat")
	chatobj.innerHTML = chatobj.innerHTML + "<br />Server Desconectado"
	chatobj.scrollTop = chatobj.scrollHeight
})

var send = function() {
  var input = document.getElementById("userInput").value
	document.getElementById("userInput").value = ""

  if (input.trim().length > 0)
    socket.emit("msg", input.trim())
}

document.getElementById("chatForm").onsubmit = send;
