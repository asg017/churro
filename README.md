# Churro

Access your computer's terminal in an Observable notebook!

## Overview

Churro is a basic server that you run locally on your computer (or any
computer that you want to access on Observable).

Under the hood, Churro will create a [`node-pty`](https://github.com/microsoft/node-pty)
process that is directly piped into the xterm.js Terminal on Observable. Each connection is authenticated with a basic JWT workflow - You can generate a JWT using `cli.js`, then use that generated token in your Observable notebook.

In essence, it's kinda like an SSH server, but with less security and
a little easier to manage!

## security

Be extremely cautious using this! If an attacker has direct access to your
terminal it's game over. If you do use this, consider taking these steps to make yourself (a little) more secure:

1. Never forward your port to ngrok.io or some other service! Keep it only on
   localhost to limit any attacks.
2. Have tokens expires quickly! This is why this uses JWT - it's annoying to
   keep generating tokens but it at least keeps you safer.
3. Don't run this on an AWS server or something similar - run this on your local
   machine then ssh into wherever.
4. Try and run this in a Docker instance instance of your full computer's shell.

## Uses

- No need to switch windows from Observable <-> your terminal, keep it all in once place!
- Kickoff data pipeline without leaving Observable
- Workshops on how to use the terminal?

## Installation

```bash
git clone ....

cd churro/
npm install
```

Then, in one terminal, run:

```bash
npm start

> putty@1.0.0 start /home/you/churro
> nodemon server.js

[nodemon] 1.19.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
socket.io server on port 8888

```

Sweet, your server is now running!
