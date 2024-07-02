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

async function verifyPassword(password, storedPassword) {
    try {
        // Parse storedPassword JSON to extract salt and hash
        const { salt, hash } = JSON.parse(storedPassword);
        
        // Hash the input password with the extracted salt
        const hashedInput = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        
        // Compare the hashed input with the stored hash
        return hashedInput === hash;
    } catch (error) {
        throw new Error('Password verification failed: ' + error.message);
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};



// {"salt":"a86dd73c9b8b0510e7e292fd71cc2561","hash":"c37eeadd67554958ad66618fda981719c62e29901d70eb84d22cbdf467515bb5da72c4b65b56f9f3683cf2053fb3e88ab767db46e7cc29fe1e18bf65742caddd"}