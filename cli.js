const { argv } = require('node:process');
// const { mdLinks } = require('./api');
 // #!/usr/bin/env nodo 

 // SLICE - Devuelve una copia de una sección de una matriz. Tanto para el inicio como para el final, se puede usar un índice negativo para indicar un desplazamiento desde el final de la matriz.
 // Por ejemplo, -2 se refiere al penúltimo elemento de la matriz.
 const option = process.argv.slice(2)

// Devuelve un array que contiene los argumentos de la línea de comandos pasados ​​cuando se inició el proceso de Node.js.
// El primer elemento será execPath.
// El segundo elemento será la ruta al archivo JavaScript que se está ejecutando.
// Los elementos restantes serán cualquier argumento de línea de comando adicional.
// Por ejemplo, asumiendo el siguiente script para process-args.js:
    
const path = process.argv[2]
// print process.argv
argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });

//SIMULACIÓN DE UN CLI - argumentos, validate, api básico

// mdLinks('README.md')
// .then(() => {

// })
// .catch((error) => { 
//     console.log(error) 
// });

// console.log(process.argv); // Muestra un array con: la ruta del archivo ejecutable de node y del archivo ejecutado
// node cli.js one two=three four //Muestra el índice de las rutas y agrega nuevos elementos con sus índices
// process (env, argv, stdin-stdout-stderr, exit-code)
