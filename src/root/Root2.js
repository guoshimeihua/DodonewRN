import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {StackNavigator} from 'react-navigation';

import Home from '../home/Home';
import Mine from '../mine/Mine';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    render () {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="首页"
                        titleStyle={styles.tabTitle}
                        selectedTitleStyle={styles.tabSelectedTitle}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('./tabbar_home_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={require('./tabbar_home_selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <Home/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        title="我的"
                        titleStyle={styles.tabTitle}
                        selectedTitleStyle={styles.tabSelectedTitle}
                        renderIcon={() => <Image style={styles.tabIcon} source={require('./tabbar_mine_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={require('./tabbar_mine_selected.png')} />}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <Mine/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

export default Navi = StackNavigator({
    Tab: {
        screen: Tab,
        navigationOptions: {
            gestureResponseDistance: {horizontal: 300},
            headerStyle: {backgroundColor: '#E44545'}, //导航栏的样式
            headerTitleStyle: {
                // 导航栏文字的样式
                color: 'white',
                fontSize: 16,
                alignSelf: 'center'
            },
            headerTitle: '首页'
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    tabIcon: {
        width: 22,
        height: 22
    },
    tabTitle: {
        fontSize: 10,
        color: '#828282'
    },
    tabSelectedTitle: {
        fontSize: 10,
        color: '#E44545'
    }
});