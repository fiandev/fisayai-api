import path from "path";

const modules  = require('require-all')({
  dirname: path.join(__dirname, "./jobs"),
  recursive: true
});

let jobs = [];
for (let key in modules) {
  let __module__ = modules[key];
  __module__.name = key;
  jobs.push(__module__);
}

export = jobs;