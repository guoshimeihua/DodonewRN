import axios from 'axios';
import EncryptUtil from '../util/EncryptUtil';
import SortedMap from 'sorted-map';

let instance = axios.create({
    baseURL: 'http://192.168.100.120:8080',
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

/**
 * do something before request is sent
 */
instance.interceptors.request.use(function (config) {
    console.log('method is : ' + config.method);
    if (config.method === 'get' || config.method === 'delete') {
        // 对get请求params参数统一做处理
        let sortedMap = new SortedMap();
        let params = config.params;
        let keys = Object.keys(params);
        for (key of keys) {
            sortedMap.set(key, params[key]);
        }
        let paramsEncrypt = EncryptUtil.encrypt(sortedMap);
        // 最后一定要记得把params参数给置空
        config.params = null;
        let url = config.url + '?' + 'Encrypt=' + encodeURIComponent(paramsEncrypt);
        console.log('get url is : ' + url);
        config.url = url;
    } else if (config.method === 'post' || config.method === 'patch' || config.method === 'put') {
        // 对post请求data参数统一做处理
        let sortedMap = new SortedMap();
        let data = config.data;
        let keys = Object.keys(data);
        for (key of keys) {
            sortedMap.set(key, data[key]);
        }
        let paramsEncrypt = EncryptUtil.encrypt(sortedMap);
        console.log('加密后的字符串: ' + paramsEncrypt);
        // 一定要记得对参数进行encodeURIComponent，在服务端也要对参数进行decodeURIComponent,
        // 否则base64在解码的时候就出现错误的。
        config.data = {
            Encrypt: encodeURIComponent(paramsEncrypt)
        };
    }
    return config;
}, function (error) {
    // do something with request error
    console.log('do something with request error');
    return error;
});

/**
 * do something with response data
 */
instance.interceptors.response.use(function (response) {
    console.log('response data is : ' + response.data);
    if (response.data.length > 0) {
        let result = EncryptUtil.decrypt(response.data);
        console.log('result is : ' + result);
        // 在这里统一返回json数据
        return JSON.parse(result);
    } else {
        return new Error('response data is empty');
    }
}, function (error) {
    // do something with response error
    console.log('do something with response error');
    console.log('error is : ', error);
    return error;
})

export default instance;