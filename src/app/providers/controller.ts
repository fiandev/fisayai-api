import path from "path";

const controllers = require('require-all')({
  dirname: path.join(__dirname, "../controllers"),
  recursive: true
});

let modules = [];
for (let key in controllers) {
  modules[key] = controllers[key].default;
}

export = {
  ...controllers
}