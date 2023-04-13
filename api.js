const {
  pathExists,
  pathIsAbsolute,
  changeToAbs,
  pathisfile,
  isMdFile,
  readFileMd,
  getLinks,
} = require("./index");

const routeErr = "C:LABORATORIAPROYECTO4DEV003-md-linksREADME.md";
var routeAbs = "C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md";
const routeRelative = "README.md";

const mdLinks = (path, options) => {
  // resolve y reject son funciones callback
  return new Promise((resolve, reject) => {
    // const existsPath = pathIsAbsolute(path); // Si la ruta es absoluta
    if (pathExists(path) === true) {
        console.log('confirma si es ruta, continúa la promesa')
      // IDENTIFICA SI LA RUTA EXISTE.
      if (pathIsAbsolute(path)) {
        console.log('confirma si la ruta es absoluta, continúa la promesa')
        if (pathisfile(path)) {
            console.log('confirma si la ruta absoluta es un archivo, continúa la promesa')
          if (isMdFile(path)) {
            console.log('confirma si la ruta es un archivo .md, continúa la promesa')
            // if (readFileMd(path)) {
            // // if (options.validate===false){
            //     resolve (getLinks(path))
               
    //           //   console.log("C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md");
    //           // CONFIRMAR SI LA RUTA ES ABSOLUTA
    //           // SI LA RUTA ES RELATIVA, CONVERTILA A ABSOLUTA
    //           // CONFIRMAR SI LA RUTA ES UN ARCHIVO
    //           // CONFIRMAR SI ES UN ARCHIVO .MD ---
    //           // if options.validate===false)
    //           // (return getLinks() --- array de objeto ya obtenido
    //           //else if (options.validate===true)
    //           // (return getLinks+status+msg)
    //           //return todo 5lementos
            // } else // if (options.validate===true) {
            //     console.log('retorna 3 links + status + msg')
            // }
            // } else {
            //     reject(Error("Este archivo no se puede leer. Por favor, verfíquelo"));
            // }
          } else {
            reject(Error("La ruta ingresada no corresponde a un archivo.md"));
          }
        } else {
            reject(Error("La ruta ingresada no corresponde a un archivo"));
        }
      } else {
        changeToAbs(path);
      }
    } else {
      // SI NO EXISTE LA RUTA, SE RECHASA LA PROMESA
      reject(Error("La ruta ingresada no existe"));
    }
  });
};
console.log(mdLinks(routeRelative)).then(console.log).catch(console.log);
//   mdLinks(routeAbs,{validate: false}).then(console.log).catch(console.log);
//   mdLinks(routeAbs,{validate: true}).then(console.log).catch(console.log);
//   fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(console.log).catch(console.log);
//   fetch("C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md").then(console.log).catch(console.log);

module.exports = {
  mdLinks,
};
