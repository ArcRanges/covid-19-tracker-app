import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen'
import StatsScreen from '../screens/StatsScreen'

import ArticlesScreen from '../screens/ArticlesScreen'
import ArticleScreen from '../screens/ArticleScreen'

import VidsScreen from '../screens/VidsScreen'
import SocialScreen from '../screens/SocialScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Stack = createStackNavigator();


export function HomeStack({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#ff453a',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerTitle: 'Overview',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
      <Stack.Screen name="StatsScreen" component={StatsScreen} options={{
        headerTitle: 'Tracker',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} options={{
        headerTitle: 'Articles',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
      <Stack.Screen name="VidsScreen" component={VidsScreen} options={{
        headerTitle: 'Videos',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{
        headerTitle: 'Settings',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
    </Stack.Navigator>
  )
}

export function StatsStack({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#ff453a',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
      )
    }}
    >

      <Stack.Screen name="StatsScreen" component={StatsScreen} options={{
        headerTitle: 'Tracker',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerTitle: 'Tracker',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} options={{
        headerTitle: 'Articles',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="VidsScreen" component={VidsScreen} options={{
        headerTitle: 'Videos',
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{
        headerTitle: 'Settings',
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  )
}

export function ArticlesStack({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#ff453a',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }}
    >
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} options={{
        headerTitle: 'Articles',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />

      <Stack.Screen name="ArticleScreen"
        component={ArticleScreen} options={{
        headerTitle: 'India News',
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  )
}

export function VideosStack({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#ff453a',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }}
    >
      <Stack.Screen name="Videos" component={VidsScreen} options={{
        headerTitle: 'Videos',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />

    {/*  <Stack.Screen name="ArticleScreen"
        component={ArticleScreen} options={{
        headerTitle: 'India News',
        headerTitleAlign: 'center',
      }} />*/}
    </Stack.Navigator>
  )
}

export function SocialStack({navigation}) {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#ff453a',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }}
    >
      <Stack.Screen name="SocialScreen" component={SocialScreen} options={{
        headerTitle: 'Social Media',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        )
      }} />

    </Stack.Navigator>
  )
}

export function SettingsStack({navigation}) {
  return(
    <SettingsScreen navigation={navigation}/>
  )
}
