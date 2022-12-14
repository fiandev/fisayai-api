import * as data from "./constants/data.json";

let isValid: boolean;
let exp: any;
let sites: any[] = [];

for (let site of data.sites) {
  try {
    exp = new RegExp(site);
    isValid = true;
  } catch (e) {
    isValid = false;
  }
  
  if (isValid) sites.push(exp);
  else continue;
}

export = sites;