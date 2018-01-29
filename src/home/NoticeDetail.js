import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Time from '../util/Time';

export default class NoticeDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.item.title}`,
        headerRight: (<View/>)
    });

    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        let item = state.params.item;
        console.log('item is : ' + item);
        this.state = {
            item: item
        };
    }

    render () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.noticeView}>
                    <Text style={styles.noticeText}>{this.state.item.title}</Text>
                </View>
                <View style={styles.userView}>
                    <Text style={styles.userText}>发表人：{this.state.item.user.userName}</Text>
                    <Text style={styles.timeText}>{Time.getFormatTime(this.state.item.createDate)}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{this.state.item.content}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    noticeView: {
        height: 44,
        justifyContent: 'center',
    },
    noticeText: {
        fontSize: 17,
        padding: 10,
    },
    contentView: {
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 15,
        padding: 10,
        color: 'gray',
        lineHeight: 30,
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userText: {
        marginLeft: 10,
        fontSize: 13,
    },
    timeText: {
        marginRight: 10,
        fontSize: 13,
        color: 'gray'
    }
});