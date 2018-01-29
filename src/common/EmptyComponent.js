import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class EmptyComponent extends Component {
    constructor(props) {
        super(props);
        console.log('text is ==== ' + this.props.text);
        let text = this.props.text === '' || this.props.text === null || this.props.text === undefined ? '暂无数据' : this.props.text;
        this.state = {
            text: text
        };
    }
    render () {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyText}>{this.state.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emptyList: {
        flex: 1,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center'
    }
});