import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight, Text, ScrollView} from 'react-native';

export default class Home extends Component {
    _onPress () {
        console.log('点击进入详情页面');
        const {navigate} = this.props.navigation;
        navigate('Detail', {name: 'Lucy'});
    }

    _onDeptPress () {
        console.log('部门管理点击');
        this.props.navigation.navigate('DeptList');
    }

    render () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.deptView}>
                    <TouchableHighlight onPress={this._onDeptPress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>部门管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.employeeView}>
                    <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>员工管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.jobView}>
                    <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>职位管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.noticeView}>
                    <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>通知管理</Text>
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
    deptView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 150,
        backgroundColor: '#8fbc8f'
    },
    employeeView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 150,
        backgroundColor: '#00ced1'
    },
    jobView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 150,
        backgroundColor: '#008b8b'
    },
    noticeView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 150,
        backgroundColor: '#ffa500'
    },
    btnView: {
        height: 150,
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    }
});