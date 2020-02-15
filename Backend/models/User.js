const bcrypt = require('bcrypt');
class User {
    constructor(email, pwd){
        this.email = email;
        this.password = pwd;
    }

    isCorrectPassword(password, callback){
        bcrypt.compare(password, this.password, function(err, same) {
          if (err) {
            callback(err);
          } else {
            callback(err, same);
          }
        });
    }

    /** save this user to DB */
    save(){
        return true;
    } 
}

module.exports = User;