import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight, Text, AsyncStorage, Alert, ScrollView} from 'react-native';

export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }

    _loginOut () {
        console.log('退出登录');
        const {navigate} = this.props.navigation;
        AsyncStorage.multiRemove(['LoginName', 'Password', 'UserName'], (err) => {
            if (err !== null) {
                console.log('err is : ' + err);
                Alert.alert('', '退出登录失败');
            } else {
                navigate('Login');
            }
        });
    }

    _getUserName () {
        AsyncStorage.getItem('UserName', (error, result) => {
            console.log('userName is : ' + result);
            let userName = result === null ? '暂无用户昵称' : result;
            this.setState({
                userName: userName
            });
        });
    }

    componentDidMount () {
        this._getUserName();
    }

    render () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.userView}>
                    <Text style={styles.userDesText}>用户昵称: </Text>
                    <Text style={styles.userNameText}>{this.state.userName}</Text>
                </View>
                <View style={styles.loginOutView}>
                    <TouchableHighlight onPress={this._loginOut.bind(this)} underlayColor={'#696969'}>
                        <View style={styles.loginOutBtnView}>
                            <Text style={styles.loginOutText}>退出登录</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    userView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    userDesText: {
        fontSize: 16,
        marginLeft: 15,
    },
    userNameText: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10,
    },
    loginOutView: {
        backgroundColor: 'white',
        marginTop: 60,
        marginLeft: 0,
        marginRight: 0,
        height: 44,
    },
    loginOutBtnView: {
        height: 44,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    loginOutText: {
        fontSize: 16,
        color: '#828282',
        textAlign: 'center'
    }
});