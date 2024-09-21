class AppError extends Error {
    constructor(message) {
        super(message);
    }
};

class EmptyMessage extends AppError {
    constructor(message = 'Message is empty') {
        super(message, 400);
    }
}

class ClientExist extends AppError {
    constructor(message = 'Client already exist') {
        super(message, 400);
    }
}

class InvalidLogin extends AppError {
    constructor(message = 'Login is required') {
        super(message, 400);
    }
}

class InvalidNamak extends AppError {
    constructor(message = 'Namak is required') {
        super(message, 400);
    }
}

class InvalidMessage extends AppError {
    constructor(message = 'Invalid message format') {
        super(message, 400);
    }
}


module.exports = {
    AppError,
    EmptyMessage,
    ClientExist,
    InvalidLogin,
    InvalidNamak,
    InvalidMessage,
};
