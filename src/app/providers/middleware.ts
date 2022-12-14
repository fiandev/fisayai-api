import path from "path";

const middlewares = require('require-all')({
  dirname: path.join(__dirname, "../middlewares"),
  recursive: true
});

let modules = [];
for (let key in middlewares) {
  modules[key] = middlewares[key].default;
}

export = {
  ...middlewares
}