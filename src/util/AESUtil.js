import CryptoJS from 'crypto-js';
import Constants from './Constants';

const key = CryptoJS.enc.Latin1.parse(Constants.AES_KEY);
const iv = CryptoJS.enc.Latin1.parse(Constants.AES_IV);

let config = {
    encrypt (encryptStr) {
        let encrypted = CryptoJS.AES.encrypt(encryptStr, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return encrypted;
    },
    decrypt (encrypted) {
        let decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
};

export default config;