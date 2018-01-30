import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight, Text, ScrollView} from 'react-native';

export default class Home extends Component {
    _onDeptPress () {
        console.log('部门管理点击');
        this.props.navigation.navigate('DeptList');
    }

    _onJobPress () {
        console.log('职位管理点击');
        this.props.navigation.navigate('JobList');
    }

    _onNoticePress () {
        console.log('通知管理点击');
        this.props.navigation.navigate('NoticeList');
    }

    _onEmployeePress () {
        console.log('员工管理点击');
        this.props.navigation.navigate('EmployeeList');
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
                    <TouchableHighlight onPress={this._onEmployeePress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>员工管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.jobView}>
                    <TouchableHighlight onPress={this._onJobPress.bind(this)} underlayColor={'#dcdcdc'}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnText}>职位管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.noticeView}>
                    <TouchableHighlight onPress={this._onNoticePress.bind(this)} underlayColor={'#dcdcdc'}>
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
