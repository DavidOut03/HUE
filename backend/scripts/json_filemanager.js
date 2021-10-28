const path = require('path');
const fs = require('fs');


function folderExists(dir) {
    dir = "./" + dir;
    var created = false;

    if(!fs.existsSync(dir)) { 
        fs.mkdirSync(dir, {recursive: true});
        created = true;
    } else {
        created = true;
    }

    return created;
}

exports.fileExists = (file, path) => {
    if(fs.existsSync("./" + path + "/" + file + ".json")) { 
        return true;
    } else {return false;}
}

function sendDataIsValid(data) {
    let valid = false;

    if(data == null) {
        console.log("Data is not defined")
        return valid; 
    }

    if(typeof(data) === 'string') {
        if(data === " " || data === "") {
            console.log("String is empty.");
            return valid;
        } else {
            valid = true;
        }
    }

    if(typeof(data) === 'object') {
        if(data.isEmpty()) {
            console.log("Object is empty.");
            return valid;
        } else {
            return true;
        }
    }

    return valid;
}

function functionCanBeUsed(data) {
    let can = false;

    if(Array.isArray(data)) {
        if(data.length = 0) {
            return can;
        } 

        let array = " ";

        for(var i = 0; i < data.length; i++) {
            const valid = sendDataIsValid(data[i]);
            array = array + " " + valid;
        }

        if(!array.includes("false")) {
            can = true;
        }
    }
       
    return can;
} 

exports.createFile = (file, dir) => {
    if(functionCanBeUsed([file, dir]) && folderExists(dir)) { 
        let data = JSON.stringify({}, null, 2);
        fs.writeFile("./" + dir + "/" + file + ".json", data, (err) => { if(err) {console.log(err); return null;} else {console.log("Successfully created the file: " + file + ".json in the: " + dir + " directory." );} });
    } else {
        console.log("Function couldn't be used because not all of the data is valid.")
    }
}

exports.deleteFile = (file, dir) => {
    if(functionCanBeUsed([file, dir]) && folderExists(dir)) { 
        fs.unlink("./" + dir + "/" + file + ".json", (err) => { if(err) {console.log(err); return null;} else {console.log("Successfully deleted the file: " + file + ".json in the: " + dir + " directory." );} });
    } else {
        console.log("Function couldn't be used because not all of the data is valid.")
    }
}

exports.setFileData = (file, dir, data) => {
    if(functionCanBeUsed([file, dir, data]) && folderExists(dir)) { 
        let finalData = JSON.stringify(data, null, 2);
        fs.writeFile("./" + dir + "/" + file + ".json", finalData, (err) => { if(err) {console.log(err); return null;} else {console.log("Successfully updated the file: " + file + ".json in the: " + dir + " directory." );} })
    } else {
        console.log("Function couldn't be used because not all of the data is valid.")
    }  
}
exports.getFileData = (file, dir) => {
    try {
        if(functionCanBeUsed([file, dir]) && folderExists(dir)) { 
            let data = fs.readFileSync(path.resolve("./" + dir, file + '.json'));
            let parsedData = JSON.parse(data);
            return parsedData;
        } else {
            console.log("Function couldn't be used because not all of the data is valid.")
        }
    } catch (e) {
        return null;
    }
  
}

