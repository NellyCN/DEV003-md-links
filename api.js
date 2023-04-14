const {
  pathExists,
  pathIsAbsolute,
  changeToAbs,
  pathisfile,
  isMdFile,
  getLinks,
  validateLink,
} = require("./index");

const routeErr = "C:LABORATORIAPROYECTO4DEV003-md-linksREADME.md";
// var routeAbs = "C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md";
var routeAbs = 'C:\LABORATORIA\PROYECTO4\DEV003-md-links\README.md';
const routeRelative = "README.md";

const mdLinks = (path, options) => {
  // resolve y reject son funciones callback
  return new Promise((resolve, reject) => {
    let newAbsoluteRoute = "";
    // const existsPath = pathIsAbsolute(path); // Si la ruta es absoluta
    if (pathExists(path) === true) {  // Confirma si la ruta existe, continúa la promesa
      if (!pathIsAbsolute(path) === true) { // Confirma si el path es diferente de absoluto
        newAbsoluteRoute = changeToAbs(path);  // asignamos el valor de la nueva ruta absoluta en newAbsoluteRoute
        console.log('path', newAbsoluteRoute)
      } else {
        
        newAbsoluteRoute = path  // Si la ruta ingresada es absoluta, se asignará también en newAbsoluteRoute
        console.log('nuevo path', newAbsoluteRoute)
      }
      // console.log("confirma si la ruta es absoluta, continúa la promesa");
      if (pathisfile(newAbsoluteRoute) === true) {
        // console.log(
        //   "confirma si la ruta absoluta es un archivo, continúa la promesa"
        // );
        if (isMdFile(newAbsoluteRoute) === true) {
          // console.log(
          //   "confirma si la ruta es un archivo .md, continúa la promesa"
          // );
          getLinks(newAbsoluteRoute) 
            .then((links) => {
              //console.log("leemos el archivo", links);
              if (!options.validate === true) {
                resolve(links)
              } 
              else {
                validateLink(links).then((validatesLinks) => {
                  resolve(validatesLinks)
                });
              }
            })
            .catch((error) => {
              console.log('soy un reject', error)
              reject(Error("Este archivo no se puede leer. Por favor, verfique el archivo"));
            });
        } else {
          reject(Error("Este archivo no es un archivo con extensión .md"));
        }
      } else { 
      
        reject(Error("La ruta ingresada no corresponde a un archivo"));
      }
    } else {
      // SI NO EXISTE LA RUTA, SE RECHAZA LA PROMESA
      reject(Error("La ruta ingresada no existe"));
    }
  });
};
mdLinks('README.md', {validate: true})
.then((result) => { console.log(result)})
.catch((error) => { console.log(error)});

//   mdLinks(routeAbs,{validate: false}).then(console.log).catch(console.log);
//   mdLinks(routeAbs,{validate: true}).then(console.log).catch(console.log);
//   fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(console.log).catch(console.log);
//   fetch("C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md").then(console.log).catch(console.log);
//'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'

module.exports = {
  mdLinks,
};
