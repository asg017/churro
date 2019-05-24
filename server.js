const port = process.env.PORT || 8888;
const io = require("socket.io")(port);
const os = require("os");
const pty = require("node-pty");
const socketioJwt = require("socketio-jwt");
require("dotenv").config();

const secret = process.env.SECRET;

if (!secret) {
  console.error(`ERROR: Please provide a string SECRET env var in .env`);
  io.close();
  return;
}
console.log(`socket.io server on port ${port}`);

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

io.on(
  "connection",
  socketioJwt.authorize({
    secret: process.env.SECRET,
    timeout: 2000
  })
)
  .on("authenticated", function(socket) {
    console.log("Authentication! ", socket.decoded_token);
    socket.on("sendData", data => {
      console.log("Got data from sendData");
      ptyProcess.write(data);
    });
    socket.emit("token", socket.decoded_token);
    ptyProcess.on("data", data => {
      socket.emit("data", data);
    });
  })
  .on("unauthorized", err => {
    console.error("um please", err);
  });

ptyProcess.write("ls\r");
ptyProcess.resize(80, 35);
ptyProcess.write("ls\r");
