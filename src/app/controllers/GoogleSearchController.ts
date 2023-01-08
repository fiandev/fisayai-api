// import modules
import google from "google";
import translate from "translate-google";
import cheerio from "cheerio";

import Controller from "../cores/Controller";
import jobs from "../../explorer/jobs";

const PROTOCOL_URL = /^(http(s))/;

export default class GoogleSearchController extends Controller {
  async index () {
    const { lang = "en-us" } = this.request.params;
    const { q = "" } = this.request.query;
    const data = [];
    const googleHost = "https://google.com";
    
    try {
      google(q, async (err, res) => {
        if (err) throw err;
        let $ = res.$;
        let $links = $("a");
        let isDone = false;
        let result: any[] = [];
        
        $links.each( async (index) => {
          let $link = $links[index];
          let url = $link.attribs.href;
          url = PROTOCOL_URL.test( url ) ? url : googleHost + url;
          
          for await (let job of jobs) {
            if (isDone) break;
            for await (let site of job.sites) {
              if (site.test(url)) {
                try {
                  this.setTemplate({
                    job: job.name
                  });
                  
                  result = await job.handler(url);
                  isDone = true;
                  break;
                } catch (e) {
                  console.log(url, "error!")
                  continue;
                }
              }
              else continue;
            }
          }
          
          if (result.length >= 1) {
            let stringExp = `(${ q.toLowerCase().split(" ").join("|") })`;
            let exp = new RegExp(`${ stringExp }`);
            let finallResult = result.map((word) => {
              let match = word.toLowerCase().match(exp);
              if (!match) return "";
              else {
                let start = match ? match.index : 0;
                return word.slice(start, -1);
              }
            }).filter((word) => word !== "" && /^(\w+)\s([a-zA-Z]+)\s(\S|\s)+/.test(word) ); // filter null string and valid word
            
            this.success(finallResult);
            
            /* out of each loop */
            return false;
          }
        });
        
        if (result.length < 1) {
          let text = `maaf, saya tidak dapat menemukan jawaban yang relevan dari pertanyaan anda.\nAnda bisa mencobanya kembali dengan pertanyaan yang lebih spesifik.`;
          let message = await translate(text, {to: lang});
          this.error(message);
        }
      });
      
      
    } catch (err) {
      this.error(err.message);
    }
    
  }
  
  raw () {
    const { lang = "en-us" } = this.request.params;
    const { q = "" } = this.request.query;
    try {
      
      google(q, (err, res) => {
        if (err) throw err;
        this.blob(res.body);
      });
      
    } catch (err) {
      this.error(err.message)
    }
    
  }
}