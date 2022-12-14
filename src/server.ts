import Express from "express";
import path from "path";

const server = new Express();
const __public = path.resolve("../../public");

server.use(Express.static(__public));

export = server;