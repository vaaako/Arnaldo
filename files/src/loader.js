const glob = require("glob");

var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

function pegaOsComandoLa(client, message, prefix) {
  let config = require("../../config.json"); // Pegando o prefixo do bot para respostas de comandos

  // Pega só a parte do nome do comando
  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  var command = args.shift().toLowerCase();

  // Não é a maneira mais correta, mas foi a que eu encontrei
  getDirectories('commands', function (err, res) {
    if (err) return console.log('Error', err);
    
    for(i in res) {
      if(res[i].endsWith(`${command}.js`)) {
        if(res[i].includes("_commands")) return
        const commandFile = require(`../../${res[i]}`)
        commandFile.run(client, message, args);   
      }
    }
  });
}
module.exports.pegaOsComandoLa = pegaOsComandoLa;