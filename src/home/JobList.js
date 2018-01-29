import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import axios from '../util/HttpUtil';

export default class JobList extends Component {
    static navigationOptions = {
        title: '职位列表',
        headerRight: (<View/>) //设置导航栏右边的视图 和 解决当有返回箭头时，文字不居中的问题
    };

    render () {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    }
});