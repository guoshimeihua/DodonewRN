import SortedMap from 'sorted-map';
import Constants from './Constants';
import CryptoJS from 'crypto-js';

const aes_key = CryptoJS.enc.Latin1.parse(Constants.AES_KEY);
const aes_iv = CryptoJS.enc.Latin1.parse(Constants.AES_IV);

let config = {
    encrypt (sortedMap) {
        let jsonStr = this._getEncryptParams(sortedMap);
        let paramsEncrypt = CryptoJS.AES.encrypt(jsonStr, aes_key, {iv: aes_iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return paramsEncrypt;
    },

    decrypt (encryptStr) {
        let paramsDecrypt = CryptoJS.AES.decrypt(encryptStr, aes_key, {iv: aes_iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return paramsDecrypt.toString(CryptoJS.enc.Utf8);
    },

    _getEncryptParams (sortedMap) {
        sortedMap.set('timeStamp', Date.now()+'');
        let stringBuffer = '';
        for (key of sortedMap.keys().sort()) {
            if ('sign' === key || 'mysign' === key || 'code' === key) {
                continue;
            }
            let value = sortedMap.get(key);
            stringBuffer += (key + '=' + value + '&');
        }
        let params = stringBuffer += ('key=' + Constants.SIGN_KEY);
        console.log('params is : ' + params);
        let sign = CryptoJS.MD5(params).toString().toUpperCase();
        sortedMap.set('sign', sign);

        let jsonStr = JSON.stringify(this._mapToObject(sortedMap));
        console.log('params json string : ' + jsonStr);
        return jsonStr;
    },

    _mapToObject (sortedMap) {
        /**
         * 一定要记得加sort()来进行排序，一定要注意key的顺序，
         * 因为key的顺序是按照a-z来排列的，不同的顺序会造成AES加密出来的结果是不一样的。
         */
        let obj= Object.create(null);
        for (key of sortedMap.keys().sort()) {
            obj[key] = sortedMap.get(key);
        }
        return obj;
    }
};

export default config;