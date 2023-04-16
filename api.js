const {
  pathExists,
  pathIsAbsolute,
  changeToAbs,
  pathisfile,
  isMdFile,
  getLinks,
  validateLink,
} = require("./index");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let newAbsoluteRoute = "";
    if (pathExists(path) === true) {
      // Confirma si la ruta existe, continúa la promesa
      if (!pathIsAbsolute(path) === true) {
        // Confirma si el path es diferente de absoluto
        newAbsoluteRoute = changeToAbs(path); // asignamos el valor de la nueva ruta absoluta en newAbsoluteRoute
      } else {
        newAbsoluteRoute = path; // Si la ruta ingresada es absoluta, se asignará también en newAbsoluteRoute
      }
      if (pathisfile(newAbsoluteRoute) === true) {
        if (isMdFile(newAbsoluteRoute) === true) {
          getLinks(newAbsoluteRoute)
            .then((links) => {
              if (!options.validate === true) {
                resolve(links);
              } else {
                validateLink(links).then((validatesLinks) => {
                  resolve(validatesLinks);
                });
              }
            })
            .catch(() => {
              reject(
                Error(
                  "Este archivo no se puede leer. Por favor, verfique el archivo"
                )
              );
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
mdLinks("README.md", { validate: false })
  .then((result) => {
    console.log('ARRAY DE OBJETOS DE LINKS VALIDADOS', result);
  })
  .catch((error) => {
    console.log('PROMESA RECHAZADA! "Tenemos problemas para leer esta ruta"', error);
  });

module.exports = {
  mdLinks,
};
