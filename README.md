# Churro

Access your computer's terminal in an Observable notebook!

## Overview

Churro is a basic server that you run locally on your computer (or any
computer that you want to access on Observable).

Under the hood, Churro will create a `node-pty` process that is directly
piped into the xterm.js Terminal on Observable. Each connection is authenticated with a basic JWT workflow - You can generate a JWT using `cli.js`, then use that generated token in your Observable notebook.

In essence, it's kinda like an SSH server, but with less security and
a little easier to manage!

## security

Be extremely catious using this! If an attacher has direct access to your
terminal it's basically game over. If you do use this, consider taking these steps to make yourself (a little) more secure:

1.

## Uses

- No need to switch windows from Observable <-> your terminal, keep it all in once place!
- Kickoff data pipeline without leaving Observable
-

## Installation

```bash
git clone ....

cd fff/

npm install
```

Then, in one terminal, run:

```
npm start
```

Sweet, your server is now running!
