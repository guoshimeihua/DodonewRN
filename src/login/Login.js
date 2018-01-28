import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableHighlight, Keyboard, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import axios from '../util/HttpUtil';


export default class Login extends Component {
    static navigationOptions = {
        // 隐藏导航栏
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            password: '',
            animate: false
        };
    }

    _onPress () {
        console.log('登录点击了');
        Keyboard.dismiss();
        this.setState({
            animate: true
        });
        console.log('isAnimating is : ' + this.state.isAnimating);
        axios.get('/hrm/api/users/loginNameAndPassword', {
            params: {
                loginName: this.state.loginName,
                password: this.state.password
            }
        }).then((json) => {
            console.log('请求返回结果：' + json);
            let code = json['code'];
            this.setState({
                animate: false
            });
            if (code === 0) {
                const {navigate} = this.props.navigation;
                let data = json['data'];
                AsyncStorage.multiSet([['LoginName', data['loginName']], ['Password', data['password']], ['UserName', data['userName']]],
                    (errors) => {
                        if (errors !== null) {
                            console.log('数据存储失败');
                            Alert.alert('', '数据存储失败');
                        } else {
                            console.log('数据存储成功，跳转到主页面');
                            navigate('Tab');
                        }
                    });
            } else {
                let msg = json['message'];
                Alert.alert(msg);
            }
        }).catch((error) => {
            console.log('请求失败返回结果：' + error);
            Alert.alert('', '登录请求失败');
        });
    }

    render () {
        console.log('loginName : ' + this.state.loginName);
        console.log('password : ' + this.state.password);
        let isDisabled = true;
        if (this.state.loginName.length > 0 && this.state.password.length > 0) {
            isDisabled = false;
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>人事管理系统</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.loginNameView}>
                        <Text style={styles.loginNameText}>用户名</Text>
                        <TextInput placeholder={'请输入用户名'} underlineColorAndroid='transparent' maxLength={20} style={styles.loginNameInput}
                                   onChangeText={(text) => {this.setState({loginName: text})}}/>
                    </View>
                    <View style={styles.passwordView}>
                        <Text style={styles.passwordText}>密码</Text>
                        <TextInput placeholder='请输入用户密码' secureTextEntry={true} maxLength={20} underlineColorAndroid='transparent'
                                   style={styles.passwordInput} onChangeText={(text) => {this.setState({password: text})}}/>
                    </View>
                </View>
                <View style={styles.loginView}>
                    <TouchableHighlight onPress={this._onPress.bind(this)} disabled={isDisabled}>
                        <View style={isDisabled ? styles.btnView : styles.btnSelectedView}>
                            <Text style={styles.loginText}>登录</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <ActivityIndicator size='large' color='red' style={{opacity: this.state.animate ? 1 : 0}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E5F0'
    },
    titleView: {
        marginTop: 40,
        marginLeft: 0,
        marginRight: 0,
        height: 44
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },
    inputView: {
        marginTop: 50,
        marginLeft: 0,
        marginRight: 0,
        height: 88,
        backgroundColor: 'white'
    },
    loginNameView: {
        flex: 1,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        flexDirection: 'row',
        alignItems: 'center'
    },
    loginNameText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center'
    },
    loginNameInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        fontSize: 16
    },
    passwordView: {
        flex: 1,
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    passwordText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center'
    },
    passwordInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        fontSize: 16
    },
    loginView: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        height: 44
    },
    btnView: {
        margin: 0,
        borderRadius: 5,
        height: 44,
        backgroundColor: '#B8B8B8',
        justifyContent: 'center'
    },
    btnSelectedView: {
        margin: 0,
        borderRadius: 5,
        height: 44,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
});