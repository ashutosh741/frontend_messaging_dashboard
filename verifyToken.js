const jwt = require("jsonwebtoken");
require("dotenv").config();

function createResponseObject(isError, message, data = null) {
    const responseObject = {
        isError: isError,
        message: message
    };

    if (data != null) {
        responseObject.data = data;
    }
    return responseObject;
}

function Verify(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Corrected typo here
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => { // Corrected parameter name here
            if (err) {
                const response = createResponseObject(true, "Token is not valid");
                return res.status(409).json(response);
            }
            console.log("user from tokn is",user)
            req.user = user;
            next();
        });
    } else {
        const response = createResponseObject(true, "You are not authenticated");
        return res.status(401).json(response);
    }
}

module.exports = Verify;
