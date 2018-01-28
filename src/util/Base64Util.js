import CryptoJS from 'crypto-js';

let config = {
    encode (str) {
        var wordArray = CryptoJS.enc.Utf8.parse(str);
        var encodeStr = CryptoJS.enc.Base64.stringify(wordArray);
        return encodeStr;
    },

    decode(str) {
        var parsedWordArray = CryptoJS.enc.Base64.parse(str);
        var decodeStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
        return decodeStr;
    }
};

export default config;