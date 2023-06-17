import { user } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function checkUsername(username: string, usernames: string[] ) {
    const usernameRegexp = new RegExp(/^[a-zA-Z][a-zA-Z\d-_.]+$/);

    if(username.length < 12) {
        throw new Error('Username must contain from 12 to 20 characters');
    }
    else if(usernameRegexp.test(username)) {
        throw new Error('Username contains only characters, numbers and special characters (- _ .)')
    }
    else if(usernames.some(item => item === username)) {
        throw new Error('Username existed');
    }
}

export function checkEmail(email: string, emails: string[] ) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(!email.length){
        throw new Error('Email is empty')
    }
    else if(emailRegexp.test(email)) {
        throw new Error('Email is invalid')
    }
    else if(emails.some(item => item === email)) {
        throw new Error('Email existed');
    }
}

export function checkPassword(password: string, confirmPassword: string) {
    if(password.length < 8) {
        throw new Error('Password must contain at least 8 characters');
    }
    else if(password !== confirmPassword) {
        throw new Error('Confirm password is not matched')
    }
}

export async function encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
}

export async function generateToken(email: string) {
    if(process.env.TOKEN_KEY) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 3600,  // 1 hour
            data: email
        }, process.env.TOKEN_KEY);
    }
    else {
        throw new Error('No token key')
    }
}

export async function verifyToken(token: string) {
    try {
        if(process.env.TOKEN_KEY) {
            let decoded = jwt.verify(token, process.env.TOKEN_KEY);
            return decoded;     // {exp, data}
        }
    } catch(err: any) {
        throw new Error(err)
    }
}