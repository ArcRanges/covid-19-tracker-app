
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import DEFAULTS from "../default.json";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
} from "rn-placeholder";

import MapView from 'react-native-maps';
// import Heatmap from 'react-native-maps';

import { LineChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen({navigation}) {
  const image = require('../assets/images/world-1.png');
  const [country, setCountry] = useState({})
  const [longitude, latitude] = useState(0);
  const [currentNewsPage, setCurrentNewsPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hideInfoBox, setHideInfoBox] = useState(false)
  const [hideInfoBox2, setHideInfoBox2] = useState(false)
  const [hideInfoBox3, setHideInfoBox3] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [news, setNewsData] = useState([])
  // info boxes
  const AnimationRef = useRef(null);
  const AnimationRef2 = useRef(null);
  const AnimationRef3 = useRef(null);

  const LoadingNews = () => {
    return (
      <Placeholder
        Animation={Shine}>
        <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
          <PlaceholderLine width={100} style={{height: 100}}/>
        </Card>

        <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
          <PlaceholderLine width={100} style={{height: 100}}/>
        </Card>

        <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
          <PlaceholderLine width={100} style={{height: 100}}/>
        </Card>

        <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
          <PlaceholderLine width={100} style={{height: 100}}/>
        </Card>

        <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
          <PlaceholderLine width={100} style={{height: 100}}/>
        </Card>
      </Placeholder>
    )
  }

  const _onPress1 = (i) => {
    switch(i){
      case 0:
        if(AnimationRef) {
          AnimationRef.current?.fadeOut();
          setTimeout(()=> {
            setHideInfoBox(true)
          },700)
        };
        break;
      case 1:
        if(AnimationRef2) {
          AnimationRef2.current?.fadeOut();
          setTimeout(()=> {
            setHideInfoBox2(true)
          },700)
        };
        break;
      case 2:
      if(AnimationRef3) {
        AnimationRef3.current?.fadeOut();
        setTimeout(()=> {
          setHideInfoBox3(true)
        },700)
      };
      break;
    }

  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(52,199, 89, 1)`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      let country = {};
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        country = await Location.reverseGeocodeAsync(location.coords);
        country = {
          value: country[0].country,
          code: country[0].isoCountryCode,
        }
        setLocation(location)

      } else {
        country = {
          isoCountryCode: "US",
          city: "California"
        }
      }
      setCountry(country)
      fetchNews(country.isoCountryCode);

    })();

    const fetchData = () => {
      setLoading(true)
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://api.covid19api.com/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result);
          let data = result.map(a => {
            return {
              value: a.Country,
              code: a.ISO2,
              slug: a.Slug,
            }
          })

          data.sort(function(a,b){
            if(a.value < b.value) { return -1; }
            if(a.value > b.value) { return 1; }
            return 0;
          });
          setCountries(data)
          setLoading(false)
          // console.log("result");
          // console.log(data);
        })
        .catch(error => console.log('error', error));
    }

    const fetchNews = (c) => {
      setLoading(true)
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const DAYS_AGO = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const NEWS_URL = `https://newsapi.org/v2/everything?q=COVID+World&from=${DAYS_AGO}&language=en&sortBy=publishedAt&apiKey=${DEFAULTS.news.API_KEY}&pageSize=5&page=${currentNewsPage}`

      fetch(NEWS_URL, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result);
          setNewsData(result.articles)
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false)
        });
    }

  }, []);

  const fetchDataByCountry = (i) => {
    let d = countries[i]
    console.log("fetching data by country slug " + d.slug);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    // console.log(d.slug);
    let start = moment().subtract(1,'days').startOf('day').toString();
    let now = moment().subtract(1,'days').endOf('day').toString();

    console.log(start);
    console.log(now);
    // fetch(`https://api.covid19api.com/country/${d.slug}/status/confirmed/live?from=${start}&to=${now}`, requestOptions)
    fetch(`https://disease.sh/v3/covid-19/countries/${d.code}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // let p = result.map(a => {
        //   return {
        //     value: a.Province,
        //     cases: a.Cases,
        //   }
        // })
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  const offset = {
    top: 30,
    left: 0
  }

  const LeftContent = (props) => (
    <IconButton
      icon="close"
      color={props.theme == 'light' ? 'white' : 'black'}
      size={24}
      onPress={() => {
        if (props.i == 0) {
          _onPress1(0)
        } else if (props.i == 1) {
          _onPress1(1)
        } else if (props.i == 2) {
          _onPress1(2)
        }
      }}
    />
  );

  const openBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  if (country == null) {
    return (
      <View style={{padding: 20}}>
        <LoadingNews/>
      </View>
    )
  }

  return (
    <View style={styles.container}>

    <ScrollView style={{flex: 1, padding: 25,}}>

        <Text style={styles.text}>Hello, friend.</Text>

        {!hideInfoBox &&
          <TouchableOpacity onPress={()=> openBrowser("https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html")}
            activeOpacity={0.80}>
            <Animatable.View ref={AnimationRef}>
              <Card style={{ backgroundColor: 'orange',  marginTop: 40}} elevation={3}>
              <Card.Title titleStyle={{color: 'white', }} title="Protect Yourself and Others"
                subtitleStyle={{color: 'white', }} subtitle={country.city || ''} right={()=> <LeftContent i={0} theme={'light'}/>} />
              <Card.Content>
                <Paragraph style={{color: 'white', }}>How are you feeling today? Tap here to read about how to protect yourself and others.</Paragraph>

              </Card.Content>

            {/**<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>*/}
              </Card>
            </Animatable.View>
          </TouchableOpacity>
        }

        {!hideInfoBox2 &&
          <TouchableOpacity onPress={()=> openBrowser("https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html")}
            activeOpacity={0.80}>
            <Animatable.View ref={AnimationRef2}>
              <Card style={{ backgroundColor: 'yellow', marginTop: 20}} elevation={3}>
                <Card.Title title="Feeling Sick?" subtitle={country.city || ''} right={()=> <LeftContent i={1} />} />
                <Card.Content>
                  <Paragraph>Here's what to do when you are feeling sick. Tap to learn more.</Paragraph>
                </Card.Content>
              </Card>
            </Animatable.View>
          </TouchableOpacity>
        }

        {!hideInfoBox3 &&
          <TouchableOpacity onPress={()=> openBrowser("https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/index.html")}
            activeOpacity={0.80}>
            <Animatable.View ref={AnimationRef3}>
              <Card style={{ backgroundColor: 'pink', marginTop: 20}} elevation={3}>
                <Card.Title title="New Normal" subtitle={country.country || ''} right={()=> <LeftContent i={2} theme={'light'}/>} />
                <Card.Content>
                  <Paragraph>The world as we know it has drastically changed over the past few months. Here's some tips in order to cope up with all the challenges. Tap to learn more.</Paragraph>
                </Card.Content>
              </Card>
            </Animatable.View>
          </TouchableOpacity>
        }


        <View style={{marginBottom: 40}}>
          <Text style={styles.headerText}>Latest News</Text>

          {!loading && news.length !=0 ?
            <View>
              {news.map((data, index) => {
                return (
                  <TouchableOpacity key={index} onPress={()=> openBrowser(data.url)}
                    activeOpacity={0.80}>
                    <Card  style={{ backgroundColor: '#fff', padding: 20, marginBottom: 10}} elevation={3}>
                      <Text style={styles.newsTitle}>{data.title}</Text>
                      <Text style={styles.newsSubTitle}>{data.description}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={{color: 'lightgray', fontSize: 12, textAlign: 'left', }}>from {data.source.name} ({moment(data.publishedAt).format("MM-DD-YYYY")})</Text>

                        <Text style={{color: 'rgba(100, 210,255, 1)'}}>Read more...</Text>
                      </View>

                    </Card>
                  </TouchableOpacity>
                )
              })}

            </View> :
            <View style={{marginTop: 10}}>
              <LoadingNews/>
            </View>

          }

          <TouchableOpacity onPress={()=> navigation.navigate('Articles')}>
            <Text style={{textAlign: 'center', color: 'rgba(100, 210,255, 1)'}}>View more...</Text>
          </TouchableOpacity>

        </View>



        {/**<Heatmap
        points={points}
                       opacity={1}
                       onZoomRadiusChange={{
                           zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                           radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                        }}
                       gradient={{
                           colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
                           values: [0, 0.25, 0.50, 0.75, 1]}}
                       maxIntensity={100}
                       gradientSmoothing={10}
                       heatmapMode={"POINTS_WEIGHT"}/>*/}

    </ScrollView>
    <ImageBackground source={image} style={styles.image}>
    </ImageBackground>


      {/**<Text>This is HomeScreen</Text>
      <Button
        onPress={() => navigation.navigate('StatsScreen')}
        title="Go to Stats"
      />
      <Button
        onPress={() => navigation.navigate('ArticlesScreen')}
        title="Go to Articles"
      />
      <Button
        onPress={() => navigation.navigate('VidsScreen')}
        title="Go to Vids"
      />
      <Button
        onPress={() => navigation.navigate('SettingsScreen')}
        title="Go to Settings"
      />*/}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 300,
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fefefe",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10
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
  box: {
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
  },
  box2: {
    height: 125,
    width: 250,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    marginRight: 20,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:24,
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 15,
  },
  newsTitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newsSubTitle: {
    marginTop: 10,
    color: 'gray',
  },
  newsTimeAgo: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  mapStyle: {
    width: Dimensions.get('window').width - 50,
    height: 400,
    marginBottom: 50
  },
});
