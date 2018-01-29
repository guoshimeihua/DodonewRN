import React, {Component} from 'react';
import {View, Image, StyleSheet, Platform, AsyncStorage, ActivityIndicator} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Home from '../home/Home';
import Mine from '../mine/Mine';
import Detail from '../home/Detail';
import Login from '../login/Login';
import DeptList from '../home/DeptList';
import JobList from '../home/JobList';
import NoticeList from '../home/NoticeList';
import NoticeDetail from '../home/NoticeDetail';

const Tab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            // stackNavigator的属性
            headerTitle: '首页',
            headerLeft: (<View/>),
            headerRight: (<View/>),
            // tab的属性
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={focused ? require('./tabbar_home_selected.png') : require('./tabbar_home_normal.png')} style={[styles.icon, {tintColor: tintColor}]}/>
            )
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            // stackNavigator的属性
            headerTitle: '我的',
            headerLeft: (<View/>),
            headerRight: (<View/>),
            // tab的属性
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={focused ? require('./tabbar_mine_selected.png') : require('./tabbar_mine_normal.png')} style={[styles.icon, {tintColor: tintColor}]}/>
            )
        }
    }
}, {
    // 设置TabNavigator的位置
    tabBarPosition: 'bottom',
    // 是否在更改标签时显示动画
    animationEnabled: true,
    // 是否允许在标签之间进行滑动
    swipeEnabled: true,
    // 按back键是否跳转到第一个Tab(首页)，none为不跳转
    backBehavior: 'none',
    // 设置Tab标签的属性
    tabBarOptions: {
        // Android属性
        upperCaseLabel: false, //是否使标签大写，默认为true
        // 共有属性
        showIcon: true, //是否显示图标，默认为true
        showLabel: true, //是否显示label，默认开启
        activeTintColor: '#E44545', //label和icon的前景色，活跃状态下（选中）
        inactiveTintColor: '#828282', //label和icon的前景色 （未选中）
        style: {
            ...Platform.select({
                ios: {
                    backgroundColor: '#F5F5F5',
                    height: 49
                },
                android: {
                    backgroundColor: '#F5F5F5',
                    height: 55
                }
            })
        },
        indicatorStyle: {
            height: 0
        },
        labelStyle: {
            ...Platform.select({
                ios: {
                    fontSize: 12
                },
                android: {
                    fontSize: 13,
                    marginTop: -5,
                    marginBottom: 5
                }
            })
        },
        iconStyle: {
            ...Platform.select({
                ios: {
                },
                android: {
                    marginBottom: 8
                }
            })
        }
    }
});

const navigationOptions = {
    gestureResponseDistance: {horizontal: 300},
    headerStyle: {backgroundColor: '#E44545'}, //导航栏的样式
    headerTitleStyle: {
        // 导航栏文字的样式
        color: 'white',
        fontSize: 16,
        alignSelf: 'center'
    },
    headerBackTitleStyle: {
        color: 'white'
    },
    headerTintColor: 'white'
};

const routeConfigs = {
    Login: {
        screen: Login
    },
    Tab: {
        screen: Tab
    },
    Detail: {
        screen: Detail
    },
    DeptList: {
        screen: DeptList
    },
    JobList: {
        screen: JobList
    },
    NoticeList: {
        screen: NoticeList
    },
    NoticeDetail: {
        screen: NoticeDetail
    }
};

const RootNavLogin = StackNavigator(routeConfigs, {
    initialRouteName: 'Login',
    navigationOptions: navigationOptions
});

const RootNavTab = StackNavigator(routeConfigs, {
    initialRouteName: 'Tab',
    navigationOptions: navigationOptions
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStauts: 1 // 1：等待检查 2：已登录 3：未登录
        }
    }

    _isLogin () {
        AsyncStorage.multiGet(['LoginName', 'Password'], (error, stores) => {
            if (stores !== null) {
                let loginName = stores[0][1];
                let password = stores[1][1];
                console.log('loginName is : ' + loginName + ' password is : ' + password);
                if (loginName !== null && password !== null) {
                    if (loginName.length > 0 && password.length > 0) {
                        this.setState({
                            loginStauts: 2
                        });
                    } else {
                        this.setState({
                            loginStauts: 3
                        });
                    }
                } else {
                    this.setState({
                        loginStauts: 3
                    });
                }
            } else {
                return false;
            }
        });
    }

    componentDidMount () {
        this._isLogin();
    }

    render () {
        console.log('loginStatus is : ' + this.state.loginStauts);
        switch (this.state.loginStauts) {
            case 1:
                return (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color='red' animating={true}/>
                    </View>
                );
            case 2:
                return (
                    <RootNavTab/>
                );
            case 3:
                return (
                    <RootNavLogin/>
                );
        }
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
