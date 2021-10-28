const cryptString = "abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ1234567890-=!@#$%^&*_+.?";



function createCustomKey(key) {
  var customCode = "";
  if(typeof(key) === 'string') {
    for(var a = 0; a < key.length; a++) {
      for(var b = 0; b < cryptString.length; b++) {
        if(key.charAt(a) === cryptString.charAt(b)) {
          if(customCode === "") {
            customCode = b;
          } else {
          customCode = customCode + "" + b;
        }
        }
      }
    }
  }

  return customCode;
}

function reverseKey(key) {
  key = createCustomKey(key).split(" ");

  var temp = "";
  for(var i = key.length -1; i >= 0; i--) {
    if(temp === "") {
      temp = key[i];
    } else {
      temp = temp + " " + key[i];
    }
  }

  return temp;
}

function superEncrypt(key, string) {
  key = createCustomKey(key).split(" ");

  var encryptedString = string;
  for(var a = 0; a < key.length; a++) {
    for(var b = 0; b < key[a]; b++) {
      encryptedString = encrypt(encryptedString);
    }
  }

  return encryptedString;
}

function superDecrypt(key, string) {
  key = reverseKey(key).split(" ");

  var decryptedString = string;
  for(var a = 0; a < key.length; a++) {
    for(var b = 0; b < key[a]; b++) {
      decryptedString = decrypt(decryptedString);
    }
  }

  return decryptedString;
}

function encrypt(string) {
  var returned = "";

  for(var a = 0; a < string.length; a++) {
    for(var b = 0; b < cryptString.length; b++) {
      if(string[a] === cryptString[b]) {
        if(cryptString[b] == cryptString[(cryptString.length - 1)]) {
          returned = returned + cryptString[0];
        } else {
          returned = returned + cryptString[(b + 1)];
        }
        
      }
    }
  }

  return returned;
}

function decrypt(string) {
  var returned = "";

  for(var a = 0; a < string.length; a++) {
    for(var b = 0; b < cryptString.length; b++) {
      if(string[a] === cryptString[b]) {
        if(cryptString[b] == cryptString[0]) {
          returned = returned + cryptString[(cryptString.length - 1)]; 
        } else {
          returned = returned + cryptString[(b - 1)];
        }
        
      }
    }
  }

  return returned;
}

exports.encrypt = superEncrypt;
exports.decrypt = superDecrypt;