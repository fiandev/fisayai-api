

export default class Controller {
    protected response: any;
    protected request: any;
    protected next: any;
    
    public constructor (req: any, res: any, next: Function) {
        this.request = req;
        this.response = res;
        this.next = next;

        next();
    }

    public success(data: any, message = 'success', statusCode = 200) {
        const { response } = this
        const obj = {
          success: true,
          message: message,
          data: data
        }

        response.status(statusCode).json(obj)
    }

    /**
     * Failed Response
     * @param {JSON} data
     * @param {String} message
     * @param {Number} statusCode
     */
    public error(data: any, message = 'failed', statusCode = 500) {
        const { response } = this
        const obj = {
          success: false,
          message: message,
          data: data
        }

        response.status(statusCode).json(obj)
    }
    /*
    * raw image response
    * @param (Strjng) url [encode]
    * @param Number) status
    */
    public raw(url: string, statusCode = 200) {
      const { response } = this
      response.status(statusCode).sendFile(url)
    }
    
    public blob(blob: string, statusCode = 200) {
      const { response } = this
      response.status(statusCode).send(blob)
    }
    
    
    getBaseUrl() {
      const { request } = this
      
      const baseUrlResult = request.protocol + '://' + request.get('host')
      return baseUrlResult
    }
    
    serverError (message = 'failed', statusCode = 500){
      const { response } = this
      
      response.status(statusCode)
    }
}