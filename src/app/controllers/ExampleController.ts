import Controller from "../cores/Controller";

export default class ExampleController extends Controller {
  async index () {
    this.success("ok")
  }
}