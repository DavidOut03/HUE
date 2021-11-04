const fileManager = require('./json_filemanager');
const encrypt = require('./encrypt.js');


function Account(username, password) {
    this.username = username;
    this.password = password;
}

exports.getAccount = (username) => {
    if(fileManager.getFileData("users", "/data") === undefined || fileManager.getFileData("users", "/data") == null) {
        return null; 
    }

    const data = fileManager.getFileData("users", "/data");
    return data.find((user) => {
        if(user.username.toLowerCase() === username.toLowerCase()) {
            return user;
        }
    });
}

exports.getAccountWithPassword = (username, password) => {
    if(fileManager.getFileData("users", "/data") === undefined || fileManager.getFileData("users", "/data") == null) {
        return null; 
    }

    if(password === undefined || password === null) {
        return null;
    } 
    const data = fileManager.getFileData("users", "/data");
    return data.find((user) => {
        if(user.username.toLowerCase() === username.toLowerCase()) {
           if(user.password === encrypt.encrypt(user.username, password)) {
            return user;
           }

           return null;
        }
     });

}

exports.getAccounts = () => {
    if(fileManager.getFileData("users", "/data") === undefined || fileManager.getFileData("users", "/data") == null) {
        return []; 
    }

    const data = fileManager.getFileData("users", "/data");
    return data;
}

exports.accountExists = (username) => {
    if(fileManager.getFileData("users", "/data") === undefined || fileManager.getFileData("users", "/data") == null) {
        return false; 
    }
    const data = fileManager.getFileData("users", "/data");
    const account = data.find((usr) => {
        if(usr.username.toLowerCase() === username.toLowerCase()) {
            return usr;
        }
    });

   if(account) {return true} else {return false;}
}

exports.createAccount = (username, password) => {
    const account = new Account(username, encrypt.encrypt(username, password));
    if(this.accountExists(username) == true) {
        return {processed: false, message: "Account already exist!"};
    }
    let data = fileManager.getFileData("users", "/data");
    const newData = [];

    if(data != null) {
        data.forEach((account) => {
            newData.push(account);
        });
    } else {
        newData.push(account);
    }

    newData.push(account);
    fileManager.setFileData("users", "/data", newData);
    return {processed: false, message: "Account created!"};
}

exports.deleteAccount = (username) => {
    const data = fileManager.getFileData("users", "/data");
    if(data != null && Array.isArray(data)) {
        const user = data.find((usr) => {
            if(usr.username.toLowerCase() === username.toLowerCase()) {
                return usr;
            }
        });

        if(user != null) {
            const finalData = [];
            data.forEach((usr) => {
                if(usr.username.toLowerCase() !== user.username.toLowerCase()) {
                    finalData.push(usr);
                }
            });

            fileManager.setFileData("users", "/data", finalData);
            return {processed: false, message: "Account deleted!"};
        }

        return {processed: false, message: "Account doesn't exist!"};
    } else {
       fileManager.setFileData("users", "/data", []);
       return {processed: false, message: "Account deleted!"};
    }
}

exports.setUsername = (username, newUserName) => {
    const data = fileManager.getFileData("users", "/data");
    const newData = [];

    if(data == null || !Array.isArray(data)) {
        return {processed: false, message: "Account not found!"};
    } else {
       if(this.accountExists(username) == false) {return {processed: false, message: "Account doesn't exist!"};}
       const user = data.find((usr) => {
           if(usr.username.toLowerCase() === username.toLowerCase()) {
               return usr;
           }
       });

       if(user == null) {return {processed: false, message: "Account doesn't exist!"};}

       data.forEach((usr) => {
          if(usr != user) {
              newData.push(usr);
          } else {
              newData.push({username: newUserName, password: usr.password});
          }
       });

       fileManager.setFileData("users", "/data", newData);
       return {processed: true, message: "Successfully set the username to: " + newUserName + "."}
    }
}

exports.setPassword = (username, newPassword) => {
    const data = fileManager.getFileData("users", "/data");
    const newData = [];

    if(data == null || !Array.isArray(data)) {
        return {processed: false, message: "Account not found!"};
    } else {
       if(this.accountExists(username) == false) {return {processed: false, message: "Account doesn't exist!"};}
       const user = data.find((usr) => {
           if(usr.username.toLowerCase() === username.toLowerCase()) {
               return usr;
           }
       });

       if(user == null) {return {processed: false, message: "Account doesn't exist!"};}

       data.forEach((usr) => {
          if(usr != user) {
              newData.push(usr);
          } else {
              newData.push({username: usr.username, password: encrypt.encrypt(usr.username, newPassword)});
          }
       });

       fileManager.setFileData("users", "/data", newData);
       return {processed: true, message: "Successfully set the password to: " + newPassword + "."}
    }
}

exports.login = (username, password) => {
    if(this.getAccount(username) != null) {
        const account = this.getAccount(username);
        const encryptedPassword = encrypt.encrypt(account.username, password);
        if(encryptedPassword === account.password) {
            return {processed: true, message: "Successfully can login."};
        } else {
            return {processed: false, message: "Password is wrong."};
        }
    } else {
        return {processed: false, message: "Account couldn't be found."};
    }
}