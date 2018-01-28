import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AESUtil from '../util/AESUtil';
import ByteUtil from '../util/ByteUtil';
import Base64Util from '../util/Base64Util';
import SortedMap from 'sorted-map';
import EncryptUtil from '../util/EncryptUtil';
import axios from '../util/HttpUtil';
import CryptoJS from 'crypto-js';

export default class InterfaceTest extends Component {
    _onPress () {
        console.log('按钮点击了');
        // this._aesTest();
        // this._byteTest();
        // this._base64Test();
        // this._encryptTest();
        // this._axiosGetTest();
        // this._axiosGetUserTest();
        // this._axiosPostUserTest();
        // this._md5Test();
        // this._axiosDeleteUserTest();
        // this._axiosPatchUserTest();
        this._axiosPutUserTest();
    }

    _md5Test () {
        const params = 'loginName=苏城12345678&password=123456&timeStamp=1516606149205&key=sdlkjsdljf0j2fsjk';
        let sign = CryptoJS.MD5(params).toString();
        console.log('before upperCase : ' + sign);
        console.log('sign is : ' + sign.toUpperCase());
    }

    _aesTest () {
        const str = '0987654f321';
        let encrypted = AESUtil.encrypt(str);
        console.log('encrypted : ' + encrypted);
        let decrypted = AESUtil.decrypt(encrypted);
        console.log('decrypted : ' + decrypted);
    }

    _byteTest () {
        const str = '123456';
        let bytes = ByteUtil.stringToByteArray(str);
        console.log('byte array : ' + bytes);
        let result = ByteUtil.byteArrayToString(bytes);
        console.log('byte array to str : ' + result);
    }

    _base64Test () {
        const str = '123456';
        let encodeStr = Base64Util.encode(str);
        console.log('encode str : ' + encodeStr);
        let decodeStr = Base64Util.decode(encodeStr);
        console.log('decode str : ' + decodeStr);
    }

    _encryptTest () {
        let sortedMap = new SortedMap();
        sortedMap.set('pageIndex', '1');
        let encryptStr = EncryptUtil.encrypt(sortedMap);
        console.log('encryptStr : ' + encryptStr);
    }

    _axiosGetTest () {
        axios.get('/hrm/api/users', {
            params: {
                pageIndex: '3'
            }
        }).then((json) => {
            console.log('请求返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    _axiosGetUserTest () {
        axios.get('/hrm/api/users/id', {
            params: {
                userId: '3'
            }
        }).then((json) => {
            console.log('请求指定用户返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    _axiosPostUserTest () {
        axios.post('/hrm/api/users', {
            loginName: '马思纯100',
            password: '123456'
        }).then((json) => {
            console.log('请求返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    _axiosDeleteUserTest () {
        axios.delete('/hrm/api/users/id', {
            params: {
                userId: '24'
            }
        }).then((json) => {
            console.log('请求返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    _axiosPatchUserTest () {
        axios.patch('/hrm/api/users/id', {
            userId: '25',
            userName: '马思纯',
            password: '123456789'
        }).then((json) => {
            console.log('请求返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    _axiosPutUserTest () {
        axios.put('/hrm/api/users/id', {
            userId: '19',
            userName: '马斯纯',
            password: '123'
        }).then((json) => {
            console.log('请求返回数据：' + json);
        }).catch((error) => {
            console.log('请求失败返回数据：' + error);
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this._onPress.bind(this)} title='测试'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    }
});