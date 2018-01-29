import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class RefreshFooterComponent extends Component {
    constructor(props) {
        super(props);
        let text = this.props.text === '' || this.props.text === null || this.props.text === undefined ? '正在加载...' : this.props.text;
        this.state = {
            text: text
        };
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    }
});