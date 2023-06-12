import bcrypt from "bcrypt";

export function checkUsername(username, users) {
    const usernameRegexp = new RegExp(/^[a-zA-Z][a-zA-Z\d-_.]+$/);

    if(username.length < 12) {
        throw new Error('Username must contain from 12 to 20 characters');
    }
    else if(usernameRegexp.test(username)) {
        throw new Error('Username contains only characters, numbers and special characters (- _ .)')
    }
    else if(users.some(user => user.username === username)) {
        throw new Error('Username existed');
    }
}

export function checkEmail(email, users) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(emailRegexp.test(email)) {
        throw new Error('Email is invalid')
    }
    else if(users.some(user => user.email === email)) {
        throw new Error('Email existed');
    }
}

export function checkPassword(password, confirmPassword) {
    if(password.length < 8) {
        throw new Error('Password must contain at least 8 characters');
    }
    else if(password !== confirmPassword) {
        throw new Error('Confirm password is not matched')
    }
}

export function encryptPassword(password) {
    bcrypt.hash(password, 10, (err, hash) => {
        return hash;
    });
}