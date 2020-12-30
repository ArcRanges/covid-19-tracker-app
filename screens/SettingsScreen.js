import React, { useState, useEffect } from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TouchableRipple,
  Switch,
  Button,
  TextInput,
  Title,
  Paragraph,
  Avatar,
  Modal,
} from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

const ModalWindow = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <View>

      <Modal visible={visible} onDismiss={hideModal}>
        <Text>Example Modal</Text>
      </Modal>
    </View>
  );
};
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SettingsStack({navigation}) {
  return (
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
      <Stack.Screen name="SettingsScreen" component={SettingsScreenComponent} options={{
        headerTitle: 'Support',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ff453a" onPress={() => {navigation.openDrawer()}} ></Icon.Button>
        ),
        headerRight: () =><Icon.Button name="email" size={25} backgroundColor="#ff453a" onPress={() => Linking.openURL('mailto:ohmcodescorp@gmail.com?subject=Covid App - Support')}></Icon.Button>

        // TODO: need to open modal from header then inside the screen itself
      }} />

    {/*  <Stack.Screen name="ArticleScreen"
        component={ArticleScreen} options={{
        headerTitle: 'India News',
        headerTitleAlign: 'center',
      }} />*/}
    </Stack.Navigator>
  )
}

function SettingsScreenComponent({navigation}) {
  const [enabled, setEnabled] = useState(true)
  const [signedIn, setSignedIn] = useState(false)
  const [email, setEmail] = useState("email@example.com")
  function _onToggleSwitch(){
    setEnabled(!enabled)
  }

  const openBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  return (
    <View style={styles.container}>
      <Paragraph style={{textAlign: 'center', color: 'gray', marginBottom: 20, marginTop: 20}}>Stay tuned. More updates are coming. </Paragraph>
    {/*
    {!signedIn && <View style={[styles.container, styles.center]}>
      <Paragraph style={{textAlign: 'center', color: 'gray', marginBottom: 20, marginTop: 20}}>Sign in to receive important updates </Paragraph>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80}}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setText(text)}
        />
      </View>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80, marginTop: 20}}>
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={email}
          onChangeText={text => setText(text)}
        />
      </View>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80, marginTop: 20}}>
        <Button
          icon={()=> <Avatar.Icon size={48} style={{backgroundColor: 'transparent', paddingRight: 15}} icon="login"/>}
          labelStyle={{ fontSize: 18}}
          onPress={text => console.log("submitting...")}
          mode="contained"
          style={{ height: 50}}
        >SIGN IN </Button>
      </View>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80, marginTop: 10}}>
        <Title style={{textAlign: 'center'}}>OR SIGN IN WITH</Title>

      </View>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80, marginTop: 0}}>
        <Button
          icon={()=> <Avatar.Icon size={48} style={{backgroundColor: 'transparent', paddingRight: 15}} icon="google-plus"/>}
          label="Password"
          labelStyle={{ fontSize: 18, color: 'white'}}
          onPress={text => console.log("submitting...")}
          mode="contained"
          style={{ height: 50,}}
          color={"rgba(255,204, 0, 1)"}
        > GOOGLE</Button>

      </View>
      <View style={{height: 50, width: SCREEN_WIDTH * 0.80, marginTop: 10}}>
        <Button
          icon={()=> <Avatar.Icon size={48} style={{backgroundColor: 'transparent', paddingRight: 15}} icon="facebook"/>}
          label="Password"
          labelStyle={{ fontSize: 18, color: 'white'}}
          onPress={text => console.log("submitting...")}
          mode="contained"
          style={{ height: 50,}}
          color={"rgba(0,122, 255, 1)"}
        >FACEBOOK</Button>

      </View>
    </View>}

    {signedIn && <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>User Settings</Text>
      </View>
      <View style={styles.listItem}>
        <Text>
          Setting 1
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>

      <View style={styles.listItem}>
        <Text>
          Setting 2
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>

      <View style={styles.listItem}>
        <Text>
          Setting 3
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>
    </View>}

    {signedIn && <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Data Settings</Text>
      </View>
      <View style={styles.listItem}>
        <Text>
          Titi pepe
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>

      <View style={styles.listItem}>
        <Text>
          Titi pepe
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>

      <View style={styles.listItem}>
        <Text>
          Titi pepe
        </Text>
        <Switch
          value={enabled}
          onValueChange={_onToggleSwitch}
        />
      </View>
    </View>}
    */}
    <View style={styles.footer}>
      <Button
        icon={()=> <Icon name="paypal" color="white" size={20}/>}
        mode="contained"
        loading={false}
        disabled={false}
        color={'rgba(100, 210,255, 1)'}
        labelStyle={{color: 'white'}}
        onPress={()=> openBrowser("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=BD73SS58WSTCE&item_name=service+donation&currency_code=USD&source=url")}
        style={{ marginBottom: 10}}
      >
        DONATE WITH PAYPAL
      </Button>
      <Text style={styles.footerText}>1.0.0 - All Rights Reserved Ⓒ - Ohmcodes Corp. 2020 </Text>
    </View>
      {/*
        <Button
          onPress={() => navigation.goBack()}
          title="Go to Back"
        />
         <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={() => navigation.openDrawer()}
        title="Open Drawer"
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  center:{
    justifyContent: 'flex-start'
  },
  sectionContainer: {
    alignItems: 'flex-start'
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 15,
  },
  listItem: {
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  footer: {
    padding: 15,
    position: 'absolute',
    bottom: 0
  },
  footerText: {
    color: 'gray'
  }
})
