
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
} from "rn-placeholder";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function VidsScreen({navigation}) {
  // const API_KEY = 'AIzaSyBghiVPq9qzUMhVFvICUWRGkSXlFZK_NsE';
  const API_KEY = 'AIzaSyC3RdrDJImZN9qZ_AjwTMN8QVFcL05IS8E';
  const PLAYLIST_ID = 'PL9S6xGsoqIBU2V6AZYGlJwZRAFJ3YDreb';
  const MAX_RESULTS = 10;

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [pageToken, setPageToken] = useState('')
  const [quotaReached, setQuotaReached] = useState(false);

  const reloadData = () => {
    setData([])
    fetchData();
  }

  const loadMoreVideos = () => {
    if (page == 1 || data.length < totalResults) {
      fetchData();
      setPage(page + 1)
    }

  }

  const fetchVideos = (playlist_id) => {
    console.log("requesting videos for id ........ " + playlist_id);

    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    // let URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=${playlist_id}&key=${API_KEY}`;
    let URL = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist_id}&key=${API_KEY}&part=snippet&maxResults=5&pageToken=${pageToken}`

    fetch(URL, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      setLoading(false)
      setData(result.items)
    }).catch(error => {
      console.log('error', error);
        setLoading(false)
    });
  }

  const fetchData = () => {
    // console.log("requesting data ........");
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    let URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&pageToken=${pageToken}&key=${API_KEY}`
    
    // console.log(URL);
    fetch(URL, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      if (result.error) {
        if (result.error.code == 403) {
          setQuotaReached(true)
          setLoading(false)
        }
        return;
      }

      let newData = data.concat(result.items)
      setData(newData)
      setPageToken(result.nextPageToken)
      setLoading(false)
      if (page == 1) {
        setTotalResults(result.pageInfo.totalResults)
      }
    }).catch(error => {
      console.log('error', error);
      setLoading(false)
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const LoadingPlaceholderVideo = () => {
    return (
      <Placeholder
        Animation={ShineOverlay}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={70} />
        <PlaceholderLine width={60} />
        <PlaceholderLine width={50} />
        <PlaceholderMedia style={{height: 400, width: '100%'}}/>
      </Placeholder>
    )
  }
  const Item = ({ item }) => (
    <View style={[styles.videoBox, styles.shadow]}>
      {loading && <LoadingPlaceholderVideo/>}
      {!loading &&
        <View>
          <Text style={styles.lastUpdatedText}>
            5 minutes ago
          </Text>
          <Text style={styles.title}>
            {item.snippet.title}
          </Text>
          <Text style={styles.paragraph}>
            {item.snippet.channelTitle}
          </Text>
          <View style={{flex: 1, height: 400}}>
            <WebView
              startInLoadingState={true}
              renderLoading={() =>
              <Placeholder Animation={ShineOverlay}>
                <PlaceholderMedia style={{height: 400, width: '100%'}}/>
              </Placeholder>}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}` }}
            />
          </View>
        </View>
      }


    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const renderFooter = () => {
   //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    return null;
  };

    
  if (quotaReached || data.length == 1) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <Text style={{textAlign: 'center', }}>
          Sorry. {'\n'}Daily quota has been reached. {'\n'}Try again tomorrow.
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={reloadData}
        refreshing={loading}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreVideos}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
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
    margin: 0,
    marginVertical: 10,
    padding: 30,
    width: SCREEN_WIDTH - 20,
    paddingBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
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
