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
const ptyProcesses = new Map();

io.on(
  "connection",
  socketioJwt.authorize({
    secret: process.env.SECRET,
    timeout: 2000
  })
)
  .on("authenticated", function(socket) {
    const { decoded_token } = socket;
    const { data } = decoded_token;
    console.log("Authentication! ", decoded_token);
    socket.emit("profile", decoded_token);
    let ptyProcess = ptyProcesses.get(data);
    if (ptyProcess == null) {
      ptyProcess = pty.spawn(shell, [], {
        name: `xterm-color${data}`,
        cols: 80,
        rows: 35,
        cwd: process.env.HOME,
        env: process.env
      });
      ptyProcesses.set(data, ptyProcess);
    }
    ptyProcess.resize(80, 35);
    ptyProcess.write('echo "Connected to a client! "\r');

    socket.on("sendData", data => {
      ptyProcess.write(data);
    });
    socket.on("resize", ({ rows = 35, cols = 80 }) => {
      ptyProcess.resize(cols, rows);
    });
    ptyProcess.on("data", data => {
      socket.emit("data", data);
    });
  })
  .on("unauthorized", err => {
    console.error("Unauthorized access", err);
  });
