import axios from "axios";
import cheerio from "cheerio";

const handler = async (link: string) => {
  const response = await axios.get(link);
  const html = response.data;
  const $ = await cheerio.load(html);
  
  let $elements = $("article, p");
  let result: any[] = [];

  await $elements.each( async (i) => {
    let text = $( $elements[i] ).text().split(" ").map((word, i) => {
      if (i < 30) return word;
    }).join(" ");
    
    
    result.push(text);
  })
  
  return result;
}

export = handler;