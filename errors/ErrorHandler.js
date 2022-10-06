class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = status;
    }
    static validationError(message = "All fields are required.") {
        return new ErrorHandler(422, message);
    }
    static notFoundError(message = "Not Found") {
        return new ErrorHandler(404, message);
    }
}
module.exports = ErrorHandler;