const args = process.argv.slice(2, process.argv.length);
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usage = {
  generate: `node cli.js generate [username] [optional:expires]`,
  verify: `node cli.js verify [token]`
};
if (args.length < 1) {
  console.log("usage:");
  console.log(usage.generate);
  console.log(usage.verify);
  return;
}

const secret = process.env.SECRET;
if (!secret) {
  console.error("Please a SECRET env var inside the .env file!");
  return;
}

const generate = args => {
  if (args.length < 2) {
    console.error(`Generate needs a username argument : ${usage.generate}`);
    return;
  }
  const username = args[1];
  const expires = args[2] || "6h";

  const token = jwt.sign(
    {
      data: username
    },
    secret,
    { expiresIn: expires }
  );

  console.log(`Secret token for ${username} - expires in ${expires}:`);
  console.log(token);
};

const verify = async args => {
  if (args.length < 2) {
    console.error(`Verify needs a username argument : ${usage.verify}`);
    return;
  }
  const token = args[1];

  new Promise(function(resolve, reject) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  })
    .then(res => {
      console.log(`Verify res`);
      console.log(res);
    })
    .catch(err => {
      console.error(`Token rejection: ${token}`);
      console.error(err);
      return null;
    });
};

const cmd = args[0].toLowerCase();
switch (cmd) {
  case "generate":
    generate(args);
    break;
  case "verify":
    verify(args);
    break;
  default:
    console.error(`Command ${cmd} not recognized.`);
}
