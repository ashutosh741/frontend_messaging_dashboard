const crypto = require('crypto');

// Function to hash a password
async function hashPassword(password) {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { salt, hash };
    } catch (error) {
        throw new Error('Hashing failed: ' + error.message);
    }
}

// Function to verify a password
async function verifyPassword(password, hashedPassword, salt) {
    try {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hashedPassword === hash;
    } catch (error) {
        throw new Error('Password verification failed: ' + error.message);
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};
