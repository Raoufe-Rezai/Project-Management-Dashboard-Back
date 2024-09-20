const bcrypt = require('bcrypt');

module.exports = class Bcrypt {
    static saltRounds = 10;
    static async hashData(password) {
        try {
            const hash = await bcrypt.hash(password, Bcrypt.saltRounds);
            return hash
        } catch (err) {
            console.log(err)
            return
        }
    }

    static async compareData(plaintext, hash) {
        try {
            const result = await bcrypt.compare(plaintext, hash);
            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err)
            return
        }

    }
}