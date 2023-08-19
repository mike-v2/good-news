const fs = require("fs");
const path = require("path");

const keyfilePath = path.join(__dirname, '../keyfile/goodnews-firebase.json');
const keyfileContents = fs.readFileSync(keyfilePath, "utf-8");
const base64Keyfile = Buffer.from(keyfileContents).toString("base64");

console.log("Base64 encoded keyfile:");
console.log(base64Keyfile);