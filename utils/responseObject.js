function createResponseObject(success, message, data = null) {
    const responseObject = {
        success: success,
        message: message
    };

    if (data !== null) {
        responseObject.data = data;
    }

    return responseObject;
}
