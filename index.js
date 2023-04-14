const fs = require("fs"); // file system functions
const { resolve } = require("path");
const path = require("path"); // path functions
// const fetch = require('node-fetch');  // fetch functions

const route =
  "C:/Users//Admin////Desktop//Courses//nodejs-fundamentals//7. path/examples/normalize.js";
const routeErr = "C:LABORATORIAPROYECTO4DEV003-md-linksREADME.md";
var routeAbs = "C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md";
const routeRelative = "README.md";
const routeJpg = "C:/LABORATORIA/PROYECTO4/DEV003-md-links/thumb.png";

// 1. CONFIRMAR SI LA RUTA EXISTE O ES VALIDA OK
const pathExists = (routeAbs) => fs.existsSync(routeAbs); // esta funcionando síncronamente
pathExists(routeAbs);
// console.log(pathExists(routeRelative));

// 2. CONFIRMAR SI LA RUTA ES ABSOLUTA OK
const pathIsAbsolute = (routeAbs) => path.isAbsolute(routeAbs);
pathIsAbsolute(routeAbs);
// console.log(pathIsAbsolute(routeErr));

// 3. CONVERTIR LA RUTA RELATIVA A ABSOLUTA OK
// const changeToAbs = (routeRelative) => path.join(__dirname, routeRelative);
const changeToAbs = (routeAbs) => path.resolve(routeAbs);
changeToAbs(routeAbs);
// console.log(changeToAbs(routeAbs));

// 4. CONFIRMAR SI ES RUTA DE UN ARCHIVO
const pathisfile = (routeAbs) => fs.statSync(routeAbs).isFile();
changeToAbs(routeAbs);
// console.log(pathisfile(routeAbs));

// 5. CONFIRMAR SI ES UN ARCHIVO .MD
const isMdFile = (routeAbs) => {
  const extensionMd = path.extname(routeAbs);
  return extensionMd === ".md";
};
isMdFile(routeAbs)
// console.log(pathisfile(routeAbs))

// 6. LEE EL ARCHIVO DE LA RUTA
const readFileMd = (route) => {
  return new Promise((resolve, reject) => {
    // retorna una promesa con un callback
    fs.readFile(route, "utf-8", (error, data) => {
      // función asíncrona. Muestra en buffer(dato crudo)- Se puede cambiar a string con utf-8
      // Lee el archivo de la ruta entregada "OK"
      if (error) {
        reject({
          error,
          mensaje:
            "Este archivo no se puede leer. Por favor, verfique el archivo",
        });
        // reject(`Error: ${error}`);
      } else {
        resolve(data);
      }
    });
  });
};
// readFileMd(routeAbs).then(console.log).catch(console.error); // PAra evitar la promesa pendiente
// console.log(readFileMd(routeAbs));

// 7. EXTRAE LINKS DEL ARCHIVO .MD funcion  q recibe data y retorna array de objetos
const getLinks = (route) => {
  return new Promise((resolve, reject) => {
    readFileMd(route).then((data) => {
      // const regularExpression = /\[(.+)\]\((https?:\/\/\w+.+)\)/g; // Creamos una expresión regular que haga match con los links dentro del archivo leído
      const regularExpression = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
      let arrayObjects = [];
      let arraylinks = data.matchAll(regularExpression);
      if (arraylinks !== null) {
        for (let value of arraylinks) {
          arrayObjects.push({
            text: value[1],
            href: value[2],
            file: route,
          });
        }
        // console.log(arrayObjects)
        resolve(arrayObjects);
      }
      else {
        reject ('Esta ruta no tiene urls')
      }
    });
  });
};
// getLinks(routeAbs).then(console.log);

// VALIDACIÓN LINKS OK // revisar linea por linea
 const validateLink = (arrayLinks) => { 
    const getStatus = arrayLinks.map((link) => {  // donde se guardarà el nuevo array de objetos
    //  console.log
      return fetch(link.href) // fetch recibe como parámetro el link con su prop .href
          .then((resolveLink) => {
              const linksStatusMessage = {
                  text: link.text,
                  href: link.href,
                  file: link.file,
                  status: resolveLink.status,
                  message: resolveLink.status >= 200 && resolveLink.status < 400 ? 'OK' : 'FAIL' // Usamos un operador ternario para la condicional expr1=true y expr2=false
              };
              return linksStatusMessage;
          }).catch((error) => {
              const statusError = {
                  text: link.text,  
                  href: link.href,
                  file: link.file,
                  status: error.status,
                  message: 'Status is Undefined'
              };
              return statusError;
          });
  });
  return Promise.all(getStatus); // Una vez resueltas la promesa, se debería retornar el getstatus o se rechaza
};
// promesas anidadas
// getLinks(routeAbs)
//   .then((arrlinks) => {
//       console.log("Array de Objetos", arrlinks)
//       validateLink(arrlinks).then((resultados) => {console.log("Agregando Status y Mensaje", resultados)})
//   })


 module.exports = {
  pathExists,
  pathIsAbsolute,
  changeToAbs,
  pathisfile,
  isMdFile, // ...
  readFileMd,
  getLinks,
  validateLink
};

//VALIDACIÓN LINKS
// let arrays = ['https://github.com/NellyCN/DEV003-md-links','https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback','https://docs.npmjs.com/getting-started/what-is-npm']
// // console.log(arrays);
// const validateLink = (arrays) => {  //ok
// //  return new Promise((resolve, reject) => {
//   let promisesArrays =  [];    //ok  
//       promisesArrays = arrays.map((link) => fetch(link.href)    
//     .then(response => {
//     return {
//       status: response.status
//     };
//     })
//     .catch({
//               error,
//               mensaje:
//                 "No hay arrays",
//             })
//     )
//         console.log(promisesArrays) //llave cierra funcion despues de new promise
//      return promisesArrays;
//     // ); // parentesis de new promise
//  }  // llave de cierre función validateLink
//  validateLink(arrays)
//  .then(console.log)


