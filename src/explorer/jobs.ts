import path from "path";

const modules  = require('require-all')({
  dirname: path.join(__dirname, "./jobs"),
  recursive: true
});

let jobs = [];
for (let key in modules) {
  jobs.push(modules[key]);
}

export = jobs;