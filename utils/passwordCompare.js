const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds to generate

// Function to hash a password
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Hashing failed', error);
    }
}

// Function to verify a password
async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Password verification failed', error);
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};
