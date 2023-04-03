const { mdLinks } = require('../index.js');
const { pathExists } = require('../index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!', mdLinks);
  });
  it('Debería devolver una promesa', () => {
    expect(mdLinks()). toBe(typeof Promise);  //
  });
  it('Debe rechazar la promesa, cuando el path no existe', () => {
    return mdLinks('C:/nelly/curso/TextDecoder.txt').catch((error) => {  // función asíncrona
      expect(error).toBe('La ruta no existe');
    })
  });

});

describe('pathExists', () => {
  it('Debería ser una función', () => {
    expect(typeof pathExists).toBe('function');
  });
  it('Debería devolver el valor de verdad', () => {
    expect(pathExists('./')).toEqual(true);
  });
})
