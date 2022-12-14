import axios from "axios";
import cheerio from "cheerio";

const handler = async (link: string) => {
  const response = await axios.get(link);
  const html = response.data;
  const $ = await cheerio.load(html);
  
  let $codes = $("pre");
  let result: any[] = [];
  
  await $codes.map( async (i) => {
    let code = await $( $codes[i] ).text();
    result.push(code);
  });
  
  return result;
}

export = handler;