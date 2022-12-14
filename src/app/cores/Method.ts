import Express from "express";
import log from "../middlewares/log";

const router = Express.Router();

export default class Method {
  protected middleware (middlewares: any[], closure: Function) {
    return closure(middlewares);
  }
  
  protected get(...args) {
    // insert middlewares
    args.push(log)
    return router.get(...args)
  }
}