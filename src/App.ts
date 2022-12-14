import server from "./server";
import Route from "./app/cores/Route";
import config from "./config";

export default class App extends Route {
  start (): void {
    const PORT = process.env.PORT || 3000;
    
    // register router
    server.use('/', super.init());
    
    server.use('*', (req: any, res: any) =>{
        res.send({
            message:'check our github for more info',
            github: config.repo.github
        })
    })
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
  }
}