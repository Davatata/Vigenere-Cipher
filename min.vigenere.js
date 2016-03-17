// Create array to hold alphabet. 
// alph[0]  = 'a'
// alph[25] = 'z'
var allLetters = 'abcdefghijklmnopqrstuvwxyz';
var alph = allLetters.split('');
new Clipboard('.btn');
var table = [];
table[0] = allLetters;


// populate our table with all 26 rotations of the alphabet
for(var i = 1; i<26; i++){
	allLetters = allLetters.substring(1) + allLetters.substring(0,1);
	table[i] = allLetters;
}
console.log(table);

// we get the rotation key, get the text to encrypt, and put into an array
function encryptText(){
	if(badKey()){ keyError(); }
	else{
		var text = $('#unencrypted').val().trim().toLowerCase();

		if(text == ''){}
		else{
			var key = $('#key').val().trim();
			$('#key').val(key);
			key = key.toLowerCase();

			var ans = '';
			var n = key.length;
			var iterator = 0;
			var arr = text.split('');

			for(var i = 0; i<arr.length; i++){
				if(isALetter(arr[i])){
					if(iterator >= n){ iterator = 0; }
					var x = alph.indexOf(key[iterator]);
					var y = alph.indexOf(arr[i]);
					var z = table[x][y];

					ans = ans + z;
					ans = ans.toUpperCase();
					iterator = iterator + 1;
				}
				else{
					ans = ans + arr[i];
				}
			}

			setEncrypted(ans);
		}
	}
}

function decryptText(){
	if(badKey()){ keyError(); }
	else{
		var text = $('#encrypted').val().trim().toLowerCase();

		if(text == ''){}
		else{
			var key = $('#key').val().trim();
			$('#key').val(key);
			key = key.toLowerCase();

			var ans = '';
			var n = key.length;
			var iterator = 0;
			var arr = text.split('');

			for(var i = 0; i<arr.length; i++){
				if(isALetter(arr[i])){
					if(iterator >= n){ iterator = 0; }
					var x = alph.indexOf(key[iterator]);
					var y = table[x].indexOf(arr[i]);
					var z = alph[y];

					ans = ans + z;
					ans = ans.toUpperCase();
					iterator = iterator + 1;
				}
				else{
					ans = ans + arr[i];
				}
			}

			setUnencrypted(ans);
		}
	}
}

// checks if a character is a letter or not
function isALetter(charVal)
{
    if( charVal.toUpperCase() != charVal.toLowerCase() )
       return true;
    else
       return false;
}

// Update the Encrypted textarea
function setEncrypted(s){
	$('#encrypted').val(s);
}

// Update the Unencrypted textarea
function setUnencrypted(s){
	$('#unencrypted').val(s);
}

// Clear both textareas
function clearAreas(){
	$('#unencrypted').val('');
	$('#encrypted').val('');
}

function keyError(){
	alert("Error: key must only contain letters.");
}

function badKey(){
	var key = $('#key').val().trim().toLowerCase();
	var arr = key.split('');
	for(var i = 0; i<arr.length; i++){
		if(! isALetter(arr[i])){
			return true;
		}
	}
}