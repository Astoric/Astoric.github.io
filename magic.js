'use strict';

const decrypt = {
	'%&!3': 'a',
	'$@!8': 'b',
	'*(@1': 'c',
	'^@)4': 'd',
	'?,#2': 'e',
	'&+=8': 'f',
	'^#*3': 'g',
	'#!;4': 'h',
	'!~]2': 'i',
	']$#7': 'j',
  '>)&3': 'k',
	'<:#9': 'l',
	'#{|6': 'm',
	'-[?9': 'n',
	'&^@7': 'o',
	'*-&3': 'p',
	'!-*5': 'q',
	'+_&2': 'r',
	'~*&2': 's',
	'&%@8': 't',
	'&^%2': 'u',
	'*^&9': 'v',
	'%@#7': 'w',
	'!@(5': 'x',
	'#(>3': 'y',
	'@>{4': 'z',
	'XD' : ' ',
	'LOL' : ',',
	'HUH' : '?',
	'HA' : '!',
	'TEEHEE' : '.'
};

const characters = Object.keys(decrypt);

function trans() {
	let message = document.getElementById('message').value || '';
	if (!message) return;
	let trans = '';
	
	message = message.split('');
	message.forEach(character => {
		character = character.toLowerCase();
		if (characters.includes(character)) {
			trans += decrypt[character];
		}
	});
	document.getElementById('translation').innerHTML = `>> ${trans}`;
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', trans, false));
