import Method from "./Method";
import ExampleController from "../controllers/ExampleController";
import GoogleSearchController from "../controllers/GoogleSearchController";

export default class Route extends Method {
  public init () {
    return [
        this.get("/example", (req, res, next) => new ExampleController(req, res, next).index() ),
        this.get("/:lang/search", (req, res, next) => new GoogleSearchController(req, res, next).index() ),
        this.get("/:lang/raw/search", (req, res, next) => new GoogleSearchController(req, res, next).raw() )
       
      ]
  }
}