class ApiResponse {
    static send(res, {success = true, message = "", data = null, statusCode = 200, error = null}) {
        return res.status(statusCode).json({
            success,
            message,
            data,
            error
        });
    };

    static error(res, { status = 500, message = "Something went wrong", error = null }) {
        // console.log("error method called");
        return res.status(status).json({
            success: false,
            message,
            error
        });
    };
}

module.exports = ApiResponse;