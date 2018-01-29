import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, Alert, Text, RefreshControl, TouchableHighlight} from 'react-native';
import axios from '../util/HttpUtil';
import EmptyComponent from '../common/EmptyComponent';
import RefreshFooterComponent from '../common/RefreshFooterComponent';
import Time from '../util/Time';

export default class NoticeList extends Component {
    static navigationOptions = {
        title: '通知列表',
        headerRight: (<View/>) //设置导航栏右边的视图 和 解决当有返回箭头时，文字不居中的问题
    };

    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            page: 1,
            loadStatus: 'loading',
            refreshing: false,
            data: [],
        };
    }

    _sendNoticeListRequest (page) {
        axios.get('/hrm/api/notices', {
            params: {
                pageIndex: page + '',
            }
        }).then((json) => {
            console.log('请求返回的数据：' + json);
            this.setState({
                animate: false,
                refreshing: false
            });
            let code = json['code'];
            if (code === 0) {
                let data = json['data'];
                console.log('data=======>：' + data);
                if (data.length < 10) {
                    this.setState({
                        loadStatus: 'nomore'
                    });
                }
                if (page === 1) {
                    this.setState({
                        data: data
                    });
                } else {
                    this.setState((state) => ({
                        data: state.data.concat(data)
                    }));
                }
            } else {
                let msg = json['message'];
                Alert.alert('', msg);
            }
        }).catch((error) => {
            console.log('请求失败返回的数据：' + error);
            this.setState({
                animate: false
            });
            Alert.alert('数据请求失败');
        });
    }

    // 下拉刷新
    _refresh () {
        console.log('下拉刷新');
        this.setState({
            refreshing: true,
            page: 1,
            loadStatus: 'loading',
        });

        console.log('下拉刷新page is : ' + this.state.page);
        this._sendNoticeListRequest(this.state.page);
    }

    // 实现上拉加载
    _onEndReached () {
        if (this.state.loadStatus === 'nomore') {
            console.log('没有更多数据了');
        } else {
            console.log('上拉加载');
            let pageIndex = this.state.page ++ ;
            this.setState({
                page: pageIndex
            });
            console.log('pageIndex is : ' + this.state.page);
            this._sendNoticeListRequest(this.state.page);
        }
    }

    _itemPress (item, index) {
        console.log('点击第' + index + '行');
        console.log('点击的item is : ' + item);
        this.props.navigation.navigate('NoticeDetail', {item: item});
    }

    _footerComponent () {
        if (this.state.data.length != 0 && this.state.loadStatus == 'loading') {
            return <RefreshFooterComponent/>
        } else if (this.state.loadStatus == 'nomore') {
            return <RefreshFooterComponent text='暂无更多'/>
        } else {
            return null
        }
    }

    _emptyComponent () {
        // 没有数据时，页面显示的内容
        return <EmptyComponent text='暂无数据'/>
    }

    _renderItem ({item, index}) {
        // 这个也可以封装出去，成为一个单独的组件
        return <TouchableHighlight onPress={this._itemPress.bind(this, item, index)} underlayColor={'#dcdcdc'}>
            <View style={styles.listItem}>
                <View style={styles.noticeView}>
                    <Text style={styles.noticeText}>{item.title}</Text>
                </View>
                <View style={styles.userView}>
                    <Text style={styles.userText}>发表人：{item.user.userName}</Text>
                    <Text style={styles.timeText}>{Time.getFormatTime(item.createDate)}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText} numberOfLines={3}>{item.content}</Text>
                </View>
            </View>
        </TouchableHighlight>
    }

    componentDidMount () {
        this._sendNoticeListRequest(this.state.page);
    }

    render () {
        console.log('data is : ' + this.state.data);
        if (this.state.animate === true) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='red' style={{opacity: this.state.animate ? 1.0 : 0.0}}/>
                </View>
            );
        } else {
            return (
                <View style={styles.listContainer}>
                    <FlatList data={this.state.data} renderItem={this._renderItem.bind(this)}
                              keyExtractor={(item, index) => index}
                              onEndReachedThreshold={0.1}
                              onEndReached={this._onEndReached.bind(this)}
                              ListEmptyComponent={this._emptyComponent.bind(this)}
                              ListFooterComponent={this._footerComponent.bind(this)}
                              refreshControl={
                                  <RefreshControl
                                      refreshing={this.state.refreshing}
                                      onRefresh={this._refresh.bind(this)}
                                      title='正在刷新....'
                                  />
                              }
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listItem: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230, 230, 230)',
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