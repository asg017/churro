# Churro

Access your computer's terminal in an Observable notebook!

![Gif of a screen recording of churro in action](https://gist.githubusercontent.com/asg017/39c218cfb5dcbcd3e1bee8a9cf7cadef/raw/05caba41b076e2820cb71bdebbfbe9dcaa0d8309/xterm.gif)


## Overview

Churro is a basic server that you run locally on your computer (or any
computer that you want to access on Observable).

Under the hood, Churro will create a [`node-pty`](https://github.com/microsoft/node-pty)
process that is directly piped into the xterm.js Terminal on Observable. Each connection is authenticated with a basic JWT workflow - You can generate a JWT using `cli.js`, then use that generated token in your Observable notebook.

In essence, it's kinda like an SSH server, but with less security and
a little easier to manage!

## Uses

- No need to switch windows from Observable <-> your terminal, keep it all in once place!
- Kickoff data pipeline without leaving Observable
- Workshops on how to use the terminal?

## Installation

```bash
git clone https://github.com/asg017/churro
cd churro/
npm install --production
```

Now, copy+paste `.sample-env` into a new file `.env`, and add a secret to `SECRET`.
Password generator [here!](https://observablehq.com/@asg017/password)

Now, you can run the server with:


```bash
npm start
socket.io server on port 8888
```

Sweet, your server is now running!

### Note on Windows

`node-pty` may requires some special dependencies on Windows - see [this](https://github.com/microsoft/node-pty#windows)
for more info.

### Generating tokens

To generate a token to use in s notebook:

```bash
./cli.js generate [namespace] [expires]
```

`[namespace]` could be any string, used so you can have multiple connections to
different terminal processes. `[expires]` is optional, it's how long the
token will be good for. For example:

```bash
./cli.js generate pipeline 1hr

Secret token for pipeline - expires in 1hr:
[Token printed out here]
```

Keep in mind, the terminal processes that are created are kept in memory - so
if the server restarts or dies, then you'll lose that process.


## Security

Be extremely cautious using this! If an attacker has direct access to your
terminal it's game over. If you do use this, consider taking these steps to make yourself (a little) more secure:

1. Never forward your port to ngrok.io or some other service! Keep it only on
   localhost.
2. Have tokens expires quickly! This is why this uses JWT - it's annoying to
   keep re-generating tokens, but it at least keeps you safer.
3. Don't run this on an AWS server or something similar - run this on your local
   machine then ssh into wherever.
4. Try and run this in a Docker instance instead of your full computer's shell.

## Contributing

Send in PR's to this repo or any Observable notebook about xterm in Observable!
