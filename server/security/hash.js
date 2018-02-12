var bcrypt = require("bcryptjs"),
    crypto = require("crypto");

module.exports = (function() {

    var random = function() {
        return crypto.randomBytes(128).toString("base64");
    };

    return {

        makeHash(password, done) {

            bcrypt.genSalt(10, function(err, salt) {

                bcrypt.hash(password, salt, function(err, hash) {

                    if (err) {
                        return done(err);
                    }

                    return done(null, hash);
                });
            });
        },

        compareHash(password, hashToCompare, done) {

            bcrypt.compare(password, hashToCompare, function(err, match) {

                if (err) {
                    return done(err);
                }

                return done(null, match);
            });
        },

        random
    };

}());
