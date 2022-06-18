const fs = require('fs');

var timeoutArray = [];

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const database = 'files/database/amor/world.db';
const databaseJson = 'files/database/amor/world.json';

const bichos = 'files/database/amor/statics/bichos.json';

// const marryStates = [
//     "Solteiro", 
//     "Viúvo(a)", 
//     "Divorciado"
// ];

module.exports = {
	amor_db: database,
	amor_json: databaseJson,

	checkUser: function(message, rows) {
		if([rows]=='') {
			message.channel.send("O usuário não está no mundo do RP do Arnaldo");
			return false;
		}
		return true; // Só pra ter certeza
	},

	checkMarriage: function(rows) {
		if(!isNaN(rows['marriage'])) { // Já que a ID é um número pode-se verificar desse jeito
			return true; // Casado
		}
		return false; // Não casado
	},

	checkTwo: function(message, rows) {
		if([rows]=='') {
			message.channel.send("O usuário não está no mundo do RP do Arnaldo");
			return false;
		} else if(isNaN(rows['marriage'])) {
			message.channel.send("Você não está casado, arrange um parceiro antes de poder coisar");
			return false;
		}
		return true; // Só pra ter certeza
	},



	/**
	 * @Items
	 */

	addDefaultItems: function(obj, id) {
		obj[id] = ({ "arma": 0, "carro": 0, "chicote": 0, "djamba": 0, "pinga": 0, "viagra": 0, "whey": 0 }); // Adicionando objeto ao json
	},
	

	checkItem: function(obj, id, item) {
		if(obj[id]) {
			if(!obj[id][item]) {
				return false;
			}
		} else {
			return false;
		}
		return true;
	},

	
	/**
	 * @MultiplesFiles
	 */
	turnMendigo: function(amount, id, message) {
		const db = new sqlite3.Database(database);
		if(parseFloat(amount)<15.25) {
			// db.close();
			db.run(`UPDATE "world" SET "mendigo"=0 WHERE "id"='${id}';`);
			message.channel.send(`<@${id}>, você virou um mendigo`);
			return true
		}
		return false
	},

	leaveMendigo: function(rowMendigo, value, id, message) {
		const db = new sqlite3.Database(database);
		if(rowMendigo>-1 && parseFloat(value)>15.25) {
			// db.close();
			db.run(`UPDATE "world" SET "mendigo"=-1 WHERE "id"='${id}';`);
			message.channel.send(`<@${id}>, você deixou de ser mendigo`);
			return true
		}
		return false;
	},

	death: async function(id) {
		const db = await sqlite.open({ filename: database, driver: sqlite3.Database });
		const rows = await db.all(`SELECT * FROM "world";`);


		// Obj
		let data = fs.readFileSync(databaseJson, 'utf-8');
		let obj = JSON.parse(data);


		delete obj[id]; // Delete from world.json
		let json = JSON.stringify(obj, null, 1);
		fs.writeFile(databaseJson, json, (err) => {
			if(err) throw err; // Se não colocar isso não funciona, por algum motivo
		});


		const user = rows[rows.findIndex(x => x.id === id)]
		// Update marriage
		if(!isNaN(rows['marriage'])) {
			let marriage = rows[rows.findIndex(x => x.id === user['marriage'])]
			db.run(`UPDATE "world" SET marriage="Viúvo(a)" WHERE "id"='${marriage['id']}';`);
		};
		db.run(`DELETE FROM "world" WHERE "id"='${id}';`) // Delete from world.db    


		// Delete from timeout
		const keys = Object.keys(timeoutArray);

		if(keys.includes(id)) {
			console.log("Dentro");

			let index = keys.indexOf(id);
			timeoutArray.splice(index, 0); // Retirar do timeout

		};
		console.log(timeoutArray);
	},


	/**
	 * @Bicho
	 */
	 getBicho: function(myNum) {        
		const key = Object.keys(bichos); // Todos as key
		const index = Math.floor(Math.random() * key.length);  // Index aleatório
		// const index = 0;
		
		const bicho = key[index]; // Um bicho aleatório
		const numbers = bichos[key[index]]; // Pega os valores da lista de números do bicho
		
		const bichoName = bicho.split(' - ')[0];
		const bichoNumber = bicho.split(' - ')[1];
		
		const zeroPad = (num, places) => String(num).padStart(places, '0')
		var myNum = zeroPad(myNum.charAt(0).toUpperCase() + myNum.toLowerCase().slice(1), 2);

		if(numbers.includes(myNum) || bichoName==myNum) 
			return [true, bicho, bichoName, bichoNumber, numbers];
		else
			return [false, bicho, bichoName, bichoNumber, numbers];
	},

	checkBicho: function(myNum) {
		const key = Object.keys(bichos); // Todos as key

		const zeroPad = (num, places) => String(num).padStart(places, '0')
		var myNum = zeroPad(capitalize(myNum), 2);

		for(let i=0; i<key.length; i++) {
			if(bichos[key[i]].includes(myNum) || key[i].split(' - ')[0]==myNum) // Checar todos os bichos para ver se o digitado corresponde
				return true;
		}
		return false;
	},



	/** 
	 * @Money
	 */
	impostoCalc: function(value) {
		return parseFloat( ((value*5)/100).toFixed(2) );
	},

	countSons: function(rows) {
		let count = rows.judeu + rows.ado_fum + rows.chines + rows.anao + rows.egirl + rows.venezuelano;
		return count;
	},


	/**
	 * @GetToRegister
	 */
	getRarity: function() {
		let rand = Math.floor(Math.random() * 100) + 1;

		if(rand<=5) // 5
			return "Lendário";
		if(rand<=20) // 15
			return "Mítico";
		if(rand<=40) // 20
			return "Raro";
		else // 60
			return "Normal";
	},

	getRace: function() {
		let rand = Math.floor(Math.random() * 100) + 1;

		if(rand<=5)
			return "venezuelano"; // 5
		if(rand<=15)
			return "egirl"; // 10
		if(rand<=30)
			return "anao"; // 15
		if(rand<=47)
			return "chines"; // 17
		if(rand<=70)
			return "ado_fum"; // 23
		else
			return "judeu"; // 30
	},

	getMarriage: function() {
		let rand = Math.floor(Math.random() * 2) + 1;
		if(rand==1) return "Solteiro";
			else return "Viúvo(a)"
	}
	

};
