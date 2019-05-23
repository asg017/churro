const io = require("socket.io")(8888);
const os = require("os");
const pty = require("node-pty");
const socketioJwt = require("socketio-jwt");
require("dotenv").config();

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on("data", data => {
  console.log("ptyProcess on data, emitting data...");
  io.emit("data", data);
});

io.on(
  "connection",
  socketioJwt.authorize({
    secret: process.env.SECRET,
    timeout: 15000
  })
).on("authenticated", function(socket) {
  console.log("hello! " + socket.decoded_token.name);
  socket.on("sendData", data => {
    console.log("socket on sendData, writing data...");
    ptyProcess.write(data);
  });
});

ptyProcess.write("ls\r");
ptyProcess.resize(80, 35);
ptyProcess.write("ls\r");
