import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export default class RegexFromFile {
  private fileContent: any;
  private result: any[];
  
  public constructor (path: string) {
    if ( !existsSync(path) ) throw new Error(`${ path } is'nt exist!`);
    this.fileContent = readFileSync(path);
  }
  
  public async txt () {
    this.fileContent.split("\n").map((exp, index) => {
        let regex: any;
        let isValid: boolean;
        
        try {
          regex = new RegExp(exp);
          isValid = true;
        } catch (e) {
          isValid = false;
          console.log(`${ exp } at line ${ index + 1 } is invalid !`)
        }
        
        if ( isValid ) this.result.push(regex);
    });
    return this.result;
  }
}