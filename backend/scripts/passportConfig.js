const authentication = require('./authentication');
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
    passport.use(new localStrategy((username, password, done) => {
        if(authentication.getAccount(username, password) == null) {
            return done(null, false);
        } 

        return done(authentication.getAccount(username, password), true);
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.username);
    })

    passport.deserializeUser((username, cb) => {
        const user = authentication.getAccount(username);
        cb(null, user.username);
    })
}