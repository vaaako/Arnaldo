const fs = require('fs');

module.exports = {
	writeFile: function(dir, json) {
 		fs.writeFile(dir, json, (err) => {
			if(err) throw err; // Se não colocar isso não funciona, por algum motivo
		});
	},

	backupFile: function(dir, backup) {
		fs.copyFile(dir, backup, (err) => {
			if (err) throw err;
			console.log(`Backup ${dir} feito com sucesso!`)
		});
	}

};