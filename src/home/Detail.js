import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Detail extends Component {
    static navigationOptions = {
        title: '详情',
        headerRight: (<View/>) //设置导航栏右边的视图 和 解决当有返回箭头时，文字不居中的问题
    };

    render () {
        const {state} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Name is : {state.params.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    }
});