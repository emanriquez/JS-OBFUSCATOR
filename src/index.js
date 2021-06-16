var JavaScriptObfuscator = require("javascript-obfuscator");
var fs = require("fs");

const nivel = {
  compact: false,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1,
  debugProtection: true,
  debugProtectionInterval: true,
  disableConsoleOutput: true,
  log: false,
  numbersToExpressions: true,
  simplify: true,
  shuffleStringArray: true,
  splitStrings: true,
  stringArrayThreshold: 1,
  unicodeEscapeSequence: false,
};

exports.obfuscateJS = (dir) => {
  fs.readdir(dir, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      //si include

      // Lea el archivo de su código JavaScript original como texto
      fs.readFile(dir + filename, "UTF-8", function (err, data) {
        if (err) {
          console.log(err);
          throw err;
        }
        // Ofuscar el contenido del archivo JS
        let obfuscationResult = JavaScriptObfuscator.obfuscate(data, nivel);

        // Escribe el código ofuscado en un archivo nuevo
        fs.writeFile(
          dir + filename,
          obfuscationResult.getObfuscatedCode(),
          function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("The file encripter!", filename);
          }
        );
      });
    });
  });
};
