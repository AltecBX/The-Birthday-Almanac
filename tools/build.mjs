// Build the deployed site from the single-file source.
//
//   node tools/build.mjs [outDir=_site]
//
// index.html stays the one self-contained source you can open straight from disk.
// For the web, this splits it into a small page, a cacheable app script and a data
// file parsed with JSON.parse (much faster for browsers than a 1.7 MB object
// literal), names both by content hash, and adds a service worker (sw.js) so the
// almanac opens instantly on return visits and works offline. No dependencies.
import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync,rmSync} from "node:fs";
import {createHash} from "node:crypto";
import {join,dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const out=resolve(root,process.argv[2]||"_site");
const hash=s=>createHash("sha256").update(s).digest("hex").slice(0,10);
const fail=m=>{console.error("build: "+m);process.exit(1);};

const src=readFileSync(join(root,"index.html"),"utf8");

// 1. the people: evaluate the literal once, re-emit as JSON.parse('...')
const dm=src.match(/<script id="data">([\s\S]*?)<\/script>/);
if(!dm)fail("no <script id=\"data\"> block found");
const PEOPLE=new Function(dm[1]+";return PEOPLE;")();
if(!Array.isArray(PEOPLE)||PEOPLE.length<100)fail("PEOPLE did not evaluate to the expected array");
const json=JSON.stringify(PEOPLE);
if(JSON.stringify(JSON.parse(json))!==json)fail("people data does not round-trip through JSON");
const dataJs="const PEOPLE=JSON.parse('"+json.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"');\n";

// 2. the app: the last plain inline <script> is the application
const plain=[...src.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const app=plain[plain.length-1];
if(!app||app[1].length<100000)fail("could not find the application script");
const appJs=app[1];

const hData=hash(dataJs),hApp=hash(appJs),build=hash(hData+hApp+src.length);
const dataPath="data/people."+hData+".js",appPath="app."+hApp+".js";

// 3. the page: same markup and CSS, scripts deferred so the shell paints first
let html=src.replace(dm[0],'<script defer src="'+dataPath+'"></script>').replace(app[0],'<script defer src="'+appPath+'"></script>');
html=html.replace(/<html([^>]*)>/,(m,a)=>'<html'+a+' data-build="'+build+'">');
if(html.includes('id="data">'))fail("data block still present");

if(existsSync(out))rmSync(out,{recursive:true,force:true});
mkdirSync(join(out,"data"),{recursive:true});
writeFileSync(join(out,"index.html"),html);
writeFileSync(join(out,dataPath),dataJs);
writeFileSync(join(out,appPath),appJs);
for(const f of ["assets","site.webmanifest"])if(existsSync(join(root,f)))cpSync(join(root,f),join(out,f),{recursive:true});
writeFileSync(join(out,".nojekyll"),"");

// 4. the service worker, with this build's precache list
const precache=["./","index.html",appPath,dataPath,"site.webmanifest","assets/favicon.svg","assets/favicon-32.png","assets/apple-touch-icon.png","assets/icon-192.png","assets/icon-512.png"]
  .filter(f=>f==="./"||existsSync(join(out,f)));
const sw=readFileSync(join(root,"tools","sw.template.js"),"utf8").replace("__BUILD__",build).replace("__PRECACHE__",JSON.stringify(precache));
writeFileSync(join(out,"sw.js"),sw);

const kb=n=>(n/1024).toFixed(0)+" KB";
console.log("build "+build+": index.html "+kb(html.length)+", "+appPath+" "+kb(appJs.length)+", "+dataPath+" "+kb(dataJs.length)+", "+PEOPLE.length+" people, sw.js precaches "+precache.length+" files");
