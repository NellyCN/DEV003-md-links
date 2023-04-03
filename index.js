const { rejects } = require("assert");
const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const route =
  "C:/Users//Admin////Desktop//Courses//nodejs-fundamentals//7. path/examples/normalize.js";
const routeErr = "C:LABORATORIAPROYECTO4DEV003-md-linksREADME.md";
var routeAbs = "C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md";
const routeRelative = "README.md";
// const routeJpg = 'C:/LABORATORIA/PROYECTO4/DEV003-md-links/thumb.png'

// 1. CONFIRMAR SI LA RUTA EXISTE O ES VALIDA OK
const pathExists = () => fs.existsSync(routeRelative); // esta funcionando síncronamente
// pathIsCorrect(routeOk);
console.log(pathExists(routeRelative));

// 2. CONFIRMAR SI LA RUTA ES ABSOLUTA OK
const pathIsAbsolute = (routeAbs) => path.isAbsolute(routeAbs);
// pathIsAbsolute();
console.log(pathIsAbsolute(routeAbs));

// 3. CONVERTIR LA RUTA RELATIVA A ABSOLUTA OK
const changeToAbs = (routeRelative) => path.join(__dirname, routeRelative);
console.log(changeToAbs(routeRelative));

// 4. CONFIRMAR SI ES RUTA DE UN ARCHIVO
const pathisfile = (routeAbs) => fs.statSync(routeAbs).isFile();
console.log(pathisfile(routeAbs));

// 5. CONFIRMAR SI ES UN ARCHIVO .MD
const isMdFile = (routeAbs) => {
  const extensionMd = path.extname(routeAbs);
  return extensionMd === ".md";
};
console.log(isMdFile(routeAbs));

// 6. LEE EL ARCHIVO DE LA RUTA

const readFileMd = (route) => {
  return new Promise(function (resolve, reject) { // retorna una promesa con un callback
    fs.readFile(route, "utf-8", (err, data) => {  // función asíncrona
      // Lee el archivo de la ruta entregada "OK"
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
// readFileMd(routeAbs).then(console.log).catch(console.err); // PAra evitar la promesa pendiente
// console.log(readFileMd(routeAbs));

// 7. EXTRAE LINKS DEL ARCHIVO .MD funcion  q recibe data y retorna array de objetos
const getLinks = (route) => {
  // let data = readFileMd(route)
  return readFileMd(route).then((data) => {
    const regularExpression = /\[(.+)\]\((https?:\/\/\w+.+)\)/g; // Creamos una expresión regular que haga match con los links dentro del archivo leído
    let arraylinks = data.match(regularExpression);
    if (arraylinks !== null) {
      return arraylinks
    }
   return []
  });
  
};
getLinks(routeAbs).then(console.log);
// console.log(getLinks(routeAbs))

// let arrayLinks = [];
// while ((arrayLinks = regularExpression.exec(routeAbs)) !== null) {
//   let msg = `Found ${arrayLinks[0]}.`;
//   msg += `Next match starts at ${regularExpression.lastIndex}`;
//   console.log(msg);
      // links.push(arraylinks);
// }
// };
// arrayLinks = isMdFile(routeAbs).map((filemd) => readFileMd(filemd)
// )

// var derText = "This is some text with [a link](https://duckduckgo.com) \n\ and break line";
//replace the linebreaks with <br>
// routeAbs = routeAbs.replace(/(?:\r\n|\r|\n)/g, '<br>');
// //check for links [text](url)
// let elements = routeAbs.match(/\[.*?\)/g);
// if( elements != null && elements.length > 0){
//   for(el of elements){
//     let txt = el.match(/\[(.*?)\]/)[1];//get only the txt
//     let url = el.match(/\((.*?)\)/)[1];//get only the link
//     routeAbs = routeAbs.replace(el,'<a href="'+url+'" target="_blank">'+txt+'</a>')
//   }
// }
//7. 
//buscar links con exp reg confirmar si hay fs.link. declaro una variable

// --------------------------------
// console.log(path);
// console.log(fs);
// console.log(path.join('https://desarrolloweb.com/articulos/lectura-archivos-nodejs.html'))
// const path = require('path');

// console.log(__dirname); // ruta absoluta del directorio en ejecución
// console.log(path.join('/public', 'dist', '/styles', 'main.css'))  // Convierte, junta a una ruta valida de acuerdo al sistema en que se encuentre (No es necesario escribir la ruta correctamente, join la corrige)
// console.log(path.basename(route)); // Devuelve el archivo base de toda la url
// console.log(path.normalize(route)); //Para normalizar la cadena de texto de una ruta utilizamos el método normalize.
// console.log(path.dirname(route)); // Me da la ruta de los directorios o carpetas sin el archivo
// console.log(path.parse(route)); //Muestra la ruta del archivo como un objeto
// console.log(path.resolve(route)); //Si le paso una ruta, la resuelve y la va a completar

// MODULO FS
// console.log(fs.readFileSync('api.js', 'utf-8'))  // leer un archivo si le paso la ruta('./data/first.txt') lo muestra en buffer(dato crudo)- Se puede cambiar a string con utf-8
// console.log((fs.readFileSync('api.js')).toString()) // leer un archivo si le paso la ruta('./data/first.txt') lo muestra en buffer(dato crudo)- Se puede cambiar a string con .tostring()

// // CONFIRMAR SI LA RUTA ES UN ARCHIVO .MD
// const  fileIsMd = (route) => path.extname(route) === '.md';
// fileIsMd();

// //Leer archivo
// const readFile = fs.readFile(route, 'utf-8')
// readFile();

// ------------------------------------------------------------
// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => { // resolve y reject son funciones callback
//     // IDENTIFICA SI LA RUTA EXISTE.
//     if(fs.existsSync(path)) {
//       // CONFIRMAR SI LA RUTA ES ABSOLUTA
//       // SI LA RUTA ES RELATIVA, CONVERTILA A ABSOLUTA
//       // CONFIRMAR SI LA RUTA ES UN ARCHIVO
//       // CONFIRMAR SI ES UN ARCHIVO .MD
//     } else {
//     // SI NO EXISTE LA RUTA, SE RECHASA LA PROMESA
//     reject('La ruta no existe');
//     }
//   });
// }

// module.exports = {
//   mdLinks, pathExists // ...
// };
