function createResponseObject(isError, message, data = null) {
    const responseObject = {
        isError: isError,
        message: message
    };

    if (data !== null) {
        responseObject.data = data;
    }

    return responseObject;
}
