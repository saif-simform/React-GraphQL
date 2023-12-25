import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"
import moment from 'moment';
import 'dotenv/config';


const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY
const CRYPTO_SECRET_IV = process.env.CRYPTO_SECRET_IV
const JWT_SECRET = process.env.JWT_SECRET
const JWT_ACCESS_EXPIRATION_MINUTES = process.env.JWT_ACCESS_EXPIRATION_MINUTES

const key = CryptoJS.enc.Hex.parse(String(CRYPTO_SECRET_KEY));
const iv = CryptoJS.enc.Hex.parse(String(CRYPTO_SECRET_IV));

const encryptUserID = async (userId) => {
    const value = CryptoJS.AES.encrypt(String(userId), key, {
        iv: iv,
        padding: CryptoJS.pad.ZeroPadding,
    }).toString();
    return value;
};

export const generateToken = async (userId) => {
    const secret = JWT_SECRET
    const accessTokenExpires = moment().add(
        JWT_ACCESS_EXPIRATION_MINUTES,
        "minutes"
    );

    const payload = {
        sub: await encryptUserID(userId),
        iat: moment().unix(),
        exp: accessTokenExpires.unix(),
    };
    return jwt.sign(payload, secret);
};

export const generateUniqueId = () => {
    // Generate a random number
    const uniqueId = Math.floor(Math.random() * 100);
    return uniqueId;
}