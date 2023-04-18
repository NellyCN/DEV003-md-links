const { pathExists, pathIsAbsolute, changeToAbs, isMdFile, readFileMd, getLinks, validateLink } = require('../index.js');
const { mdLinks } = require('../api');
const path = require("path");

global.fetch = jest.fn()

// TEST PARA CONFIRMAR SI LA RUTA EXISTE
describe('pathExists', () => {
  it('Debería retornar "false" si la ruta no existe', () => {
    expect(pathExists('rutaejemplo.md')).toBe(false);
  });
  it('Debería retornar "true" si la ruta existe', () => {
    expect(pathExists('C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md')).toBe(true);
  });
});

// TEST PARA CONFIRMAR SI LA RUTA ES ABSOLUTA
describe('pathIsAbsolute', () => {
  it('Debería retornar "false" si la ruta no es absoluta', () => {
    expect(pathIsAbsolute('rutaejemplo.md')).toBe(false);
  });
  it('Debería retornar "true" si la ruta es absoluta', () => {
    expect(pathIsAbsolute('C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md')).toBe(true);
  });
});

// TEST PARA CONVERTIR UNA RUTA RELATIVA A ABSOLUTA 
describe('changeToAbs', () => {
  it('Debería retornar "C:/LABORATORIA/PROYECTO4/DEV003-md-links/pruebadetest.txt" para "pruebadetest.txt"', () => {
    const absoluteRoute = changeToAbs('pruebadetest.txt')
    expect(path.isAbsolute(absoluteRoute)).toBe(true);
  });
});

// TEST PARA CONFIRMAR SI LA RUTA ES UN ARCHIVO .MD 
describe('extensionMdFile', () => {
  it('Deberia retornar "false" si el archivo no tiene extension .md', () => {
     expect(isMdFile('rutaejemplo.xls')).toBe(false);
  });
  it('Debería retornar "true" si el archivo tiene extensión .md', () => {
    expect(isMdFile('C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md')).toBe(true);
  });
});

//TEST PARA LEER UN ARCHIVO
describe('readFileMd', () => {

  it('Debe rechazar la promesa, cuando el archivo no se pueda leer', () => {
    return readFileMd('C:/LABORATORIA/PROYECTO4/mockTest.txt').then().catch((error) => {  // función asíncrona
      expect(error.mensaje ).toBe("Este archivo no se puede leer. Por favor, verfique el archivo");
    })
  });
});

// TEST PARA OBTENER LOS LINKS EXISTENTES EN EL ARCHIVO .MD
describe('getLinks', () => {
  it('Deberia extrar los LINKS del archivo .md como un array de Objetos', () => {
    const path = 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
    const testArrayObjects = [
      {
        text: 'Promise - MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/omise',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'How to Write a JavaScript Promise - freecodecamp (en inglés)',
        href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Función Callback - MDN',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Tests de código asincrónico con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Manual Mocks con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/manual-mocks',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Sitio oficial de npm (en inglés)',
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      }
    ]
    return getLinks(path).then(link => {
      expect(link).toEqual(testArrayObjects)
    })
  });
});

// // TEST PARA VALIDAR LOS LINKS 
describe('validateLink', () => {
  it('Deberia hacer una petición fetch y mostrar los links con su status y un mensaje de "OK" o "Fail-Error"', () => {
    fetch
    .mockResolvedValueOnce({ status: 200})
    .mockResolvedValueOnce({ status: 200})
    .mockResolvedValueOnce({ status: 200})
    .mockRejectedValueOnce({ status: 404})
    .mockRejectedValueOnce({ status: 404})
    .mockRejectedValueOnce({ status: 404})
    const testArrayObjects = [
      {
        text: 'Promise - MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/omise',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'How to Write a JavaScript Promise - freecodecamp (en inglés)',
        href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Función Callback - MDN',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Tests de código asincrónico con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Manual Mocks con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/manual-mocks',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      },
      {
        text: 'Sitio oficial de npm (en inglés)',
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md'
      }
    ]
    const getStatusMessage = [
      {
        text: 'Promise - MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/omise',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 200,
        message: 'OK'
      },
      {
        text: 'How to Write a JavaScript Promise - freecodecamp (en inglés)',
        href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 200,
        message: 'OK'
      },
      {
        text: 'Función Callback - MDN',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 200,
        message: 'OK'
      },
      {
        text: 'Tests de código asincrónico con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 'Error de Url',
        message: 'Fail-Error'
      },
      {
        text: 'Manual Mocks con Jest - Documentación oficial',
        href: 'https://jestjs.io/docs/es-ES/manual-mocks',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 'Error de Url',
        message: 'Fail-Error'
      },
      {
        text: 'Sitio oficial de npm (en inglés)',
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        file: 'C:\\LABORATORIA\\PROYECTO4\\DEV003-md-links\\mockTest.md',
        status: 'Error de Url',
        message: 'Fail-Error'
      }
    ]
    return validateLink(testArrayObjects).then(link => { 
      console.log(link)
      expect(link).toEqual(getStatusMessage)
    })
  });
});


describe('validateLink', () => {
  // it('Debería devolver una promesa', () => {
  //  return expect(validateLink([])). toBe(typeof Promise);  //
  // });
  // it('Debe rechazar la promesa, cuando el link no es válido', () => {
  //   return validateLink([]).then((e) => { expect(e).toBe('')}).catch((error) => {  // función asíncrona
  //     expect(error).toBe();
  //   })
  // });
  it('Debe rechazar la promesa, cuando no recibe un array de objetos con links', () => {
    return validateLink({}).then((e) => { expect(e).toBe([])}).catch((error) => {  // función asíncrona
      expect(error.message).toBe('No es un array');
    })
  });
})

describe('mdLinks', () => {
  // it('Debería devolver una promesa', () => {
  //   expect(mdLinks('C:/LABORATORIA/PROYECTO4/DEV003-md-links/README.md')). toBe(typeof Promise);  //
  // });
  it('Debe rechazar la promesa, cuando el path no existe', () => {
    return mdLinks('C:/nelly/curso/TextDecoder.txt').catch((error) => {  // función asíncrona
     console.log(error);
      expect(error.message).toBe("La ruta ingresada no existe");
    })
  });


  
});
