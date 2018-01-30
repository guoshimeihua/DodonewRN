import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, Alert, Text, RefreshControl, TouchableHighlight} from 'react-native';
import axios from '../util/HttpUtil';
import EmptyComponent from '../common/EmptyComponent';
import RefreshFooterComponent from '../common/RefreshFooterComponent';

export default class EmployeeList extends Component {
    static navigationOptions = {
        title: '员工列表',
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

    _sendEmployeeListRequest (page) {
        axios.get('/hrm/api/employees', {
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
        this._sendEmployeeListRequest(this.state.page);
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
            this._sendEmployeeListRequest(this.state.page);
        }
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
        return <View style={styles.listItem}>
            <View style={styles.employeeView}>
                <Text style={styles.employeeText}>{item.name}</Text>
            </View>
            <View style={styles.jobView}>
                <Text style={styles.jobText}>职位：{item.job.jobName}</Text>
                <Text style={styles.deptText}>部门：{item.dept.departName}</Text>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.infoText}>电话：{item.phone}</Text>
                <Text style={styles.infoText}>邮箱：{item.email}</Text>
                <Text style={styles.infoText}>地址：{item.address}</Text>
            </View>
        </View>
    }

    componentDidMount () {
        this._sendEmployeeListRequest(this.state.page);
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
    employeeView: {
        height: 44,
        justifyContent: 'center',
    },
    employeeText: {
        fontSize: 17,
        padding: 10,
    },
    jobView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobText: {
        marginLeft: 10,
        fontSize: 15,
    },
    deptText: {
        marginRight: 10,
        fontSize: 15,
        color: 'gray'
    },
    infoView: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoText: {
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
    }
});