import errorResponse from "../utils/responseUtil.js";

export const error = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    e.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const statusCode = 400;
        const message = "Duplicate Field Value Entered";
    }

    else if (err.name === "JsonWebTokenError") {
        const statusCode = 400;
        const message = "Json Web Token is invalid. Try again";
    }

    else if (err.name === "TokenExpiredError") {
        const statusCode = 400;
        const message = "Json Web Token is expired. Try again";
    }

    else if (err.name === "CastError") {
        const statusCode = 400;
        const message = `Resource not found. Invalid: ${err.path}`;
    }

    else if (err.name === "ValidationError") {
        err.statusCode = 400;
        const messages = Object.values(err.errors).map(val => val.message);
        err.message = `Validation error: ${messages.join('. ')}`;
    }

    return res.status(err.statusCode).json(
        errorResponse(
            err.message
        )
    );
};