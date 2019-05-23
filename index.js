var io = require('socket.io')(8888);
var os = require('os');
var pty = require('node-pty');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});

ptyProcess.on('data', function(data) {
    console.log('ptyProcess on data, emitting data...')
    io.emit('data', data);
});

io.on('connection', socket => {
  console.log(`connection made`);
  socket.on('sendData', data=>{
    console.log('socket on sendData, writing data...');
    ptyProcess.write(data);
  })
})

ptyProcess.write('ls\r');
ptyProcess.resize(80, 35);
ptyProcess.write('ls\r');
