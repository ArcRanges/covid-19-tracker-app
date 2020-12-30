
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView
} from 'react-native';

import { Video } from 'expo-av';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function VidsScreen({navigation}) {
  return (
    <View style={styles.container}>

    <ScrollView>

      {[1,2,3].map((k,i)=> (
        <View key={i} style={[styles.videoBox, styles.shadow]}>
          <Text style={styles.lastUpdatedText}>
            5 minutes ago
          </Text>
          <Text style={styles.title}>
            Facebook Trending #{k}
          </Text>
          <Text style={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            useNativeControls={true}
            isLooping
            style={{ height: 300 }}
          />
        </View>
      ))}



      {/*
        <Button
          onPress={() => navigation.goBack()}
          title="Go to Back"
        />
        <Button
        onPress={() => navigation.navigate('Profile')}
        title="Go to Profile"
      />
      <Button
        onPress={() => navigation.openDrawer()}
        title="Open Drawer"
      /> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 10
  },
  videoBox: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 30,
    width: SCREEN_WIDTH - 30,
    paddingBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  lastUpdatedText: {
    color: "lightgray",
    fontSize: 14,
    fontWeight: "bold",
    position: 'absolute',
    bottom: 20,
    right: 30
  },
  paragraph: {
    color: 'gray',
    marginBottom: 10,
  }
});
