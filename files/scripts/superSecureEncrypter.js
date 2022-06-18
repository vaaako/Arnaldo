const leetEncode = {
	'8': 'B',
	'3': 'E',
	'1': 'L',
	'0': 'O',
	'7': 'T',
	'2': 'Z',
}

const leetDecode = {
	'B': '8',
	'E': '3',
	'L': '1',
	'O': '0',
	'T': '7',
	'Z': '2',
}

module.exports = {
	superSecureEncrypter: function(message, dec=false) {
		var final = '';
		const leet = (dec) ? leetDecode : leetEncode;

		// make it 1337
		for(let i=0; i<message.length; i++) {
			let char = message[i];

			if(leet[char])
				final += leet[char];
			else
				final += char;
		}
		return final;
	}
}
