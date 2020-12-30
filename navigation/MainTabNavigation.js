import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen'
import StatsScreen from '../screens/StatsScreen'
import ArticlesScreen from '../screens/ArticlesScreen'
import VidsScreen from '../screens/VidsScreen'
import SettingsScreen from '../screens/SettingsScreen'

import { HomeStack, StatsStack, ArticlesStack, VideosStack, SocialStack, SettingsStack } from './MainStackNav'

const Tab = createMaterialBottomTabNavigator();



const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting={true}
    activeColor="#fff"
    style={{ backgroundColor: 'tomato' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="newspaper" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={StatsStack}
      options={{
        tabBarLabel: 'Tracker',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chart-bell-curve" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Articles"
      component={ArticlesStack}
      options={{
        tabBarLabel: 'Articles',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="file-find-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Videos"
      component={VideosStack}
      options={{
        tabBarLabel: 'Videos',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="play-circle-outline" color={color} size={26} />
        ),
      }}
    />
    {/**<Tab.Screen
      name="Social"
      component={SocialStack}
      options={{
        tabBarLabel: 'Social',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="emoticon-outline" color={color} size={26} />
        ),
      }}
    />*/}
    <Tab.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        tabBarLabel: 'Settings',
        tabBarColor: '#ff453a',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="settings-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default BottomTabs;
