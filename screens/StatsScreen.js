
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DEFAULTS from "../default.json";
import COUNTRIES from "../countries.json";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
} from "rn-placeholder";

import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton
} from 'react-native-paper';

import MapView , { Circle, Marker } from 'react-native-maps';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import AnimateNumber from 'react-native-animate-number'
import { Dropdown } from 'react-native-material-dropdown-v2';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen({navigation}) {
  const image = require('../assets/images/world-1.png');
  const [today, setToday] = useState("")
  const [sevenDaysAgo, setSevenDaysAgo] = useState([])
  const [sevenDaysAgoData, setSevenDaysAgoData] = useState([])
  const [stats, setStats] = useState({});
  const [location, setLocation] = useState(null);
  const [geolocation, setGeolocation] = useState(null);
  const [country, setCountry] = useState({})
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false)
  const [graphLoading, setGraphLoading] = useState(false)
  const [graphData, setGraphData] = useState([])
  const [countryCenter, setCountryCenter] = useState({})
  const [worldStatsDataLoading, setWorldStatsDataLoading] = useState(false)
  const [worldStatsData, setWorldStatsData] = useState([])

  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
    decimalPlaces: 0,
  };

  const offset = {
    top: 30,
    left: 0
  }

  const string_to_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  const LoadingPlaceholder = () => {
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

  const fetchDataByCountry = async (c) => {
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(`https://disease.sh/v3/covid-19/countries/${c}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setStats(result);
      setLoading(false);
    })
    .catch(error => {
      console.log('error', error);
      setLoading(false);
    });
  }

  const getLast7DaysData = async (countryCode) => {
    setGraphLoading(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'X-Authorization': DEFAULTS.cyberpurge.API_KEY
      }

    };

    const URL = `https://www.cyberpurge.com/api/covid/weeklyRegionalTotalCases/${countryCode.toUpperCase()}`;
    // console.log(URL);
    fetch(URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        let data = [];
        for (const [key, value] of Object.entries(result.data)) {
          data.push(value)
        }
        setGraphData(data);
        setGraphLoading(false);
      })
      .catch(error => {
        console.log('error', error)
        setGraphLoading(false);
      });
  }

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        let country = await Location.reverseGeocodeAsync(location.coords);
        setCountry({
          value: country[0].country || DEFAULTS.location.value,
          code: country[0].isoCountryCode || DEFAULTS.location.code,
        })

        return [location, country[0]];
      }
      return [
        {
          coords: {
            "latitude": 37.09024,
            "longitude": -95.712891,
          }
        },
        {
          isoCountryCode: 'US'
        }
      ]

    };

    const fetchData = () => {
      getLocation().then((res)=> {
        setGeolocation(res[0])
        fetchDataByCountry(res[1].isoCountryCode);
        getLast7DaysData(string_to_slug(res[1].isoCountryCode));
      });
    }

    const setTodaysDate = () => {
      let today = moment();
      let days_ago = [];
      const WEEKDAYS = 7;

      for (let i = 1; i < WEEKDAYS + 1; i++) {
        days_ago.push(moment().utc().subtract(i, 'days').startOf('day').format("M/D"));
      }
      setToday(moment().format("M/D"))
      setSevenDaysAgo(days_ago.reverse())
    }

    const fetchCountries = () => {
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
          setCountries(data);
          setLoading(false);
          // console.log("result");
          // console.log(data);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    }

    const fetchDataWorldwide = () => {
      setWorldStatsDataLoading(true)
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())
        .then(result => {
          let worldData = [];
          for (let i = 0; i < result.Countries.length; i++) {
            let center = COUNTRIES.find((v) => v.code == result.Countries[i].CountryCode)
            let country = {
              center: center,
              data: result.Countries[i],
            }
            worldData.push(country);
          }
          setWorldStatsData(worldData)
          setWorldStatsDataLoading(false)

        })
        .catch(error => {
          setWorldStatsDataLoading(false)
          console.log('error', error);
          setLoading(false);
        });
    }

    setTodaysDate();
    fetchData();
    fetchCountries();
    fetchDataWorldwide();

  }, []);

  return (
    <View style={styles.container}>
    <ScrollView style={{flex: 1, padding: 25,}}>

        <Text style={styles.text}>Covid-19 Tracker</Text>

        <View style={{flexDirection: 'column', marginTop: 25}}>
        {!loading && countries.length > 0 &&
          <Dropdown
          containerStyle={[styles.shadow, {backgroundColor: '#fff', borderRadius: 5}]}
            fontSize={20}
            dropdownOffset={offset}
            onChangeText={(text)=> {
              let res = countries.find(c => c.value == text);
              setCountry(res)
              fetchDataByCountry(res.code).then(()=> {
                getLast7DaysData(res.code);
              })
            }}
            label={"Select Country"}
            value={country.value || "United States"}
            data={countries}
         />}

          {loading && <ActivityIndicator small color="white"/>}
          {/**<Text style={styles.subtitle}>Last updated just now</Text>*/}
        </View>


        { loading ? <LoadingPlaceholder/> :
          <View style={{marginTop: 50, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
            <View style={[styles.shadow, styles.box]}>
              <Text>Recovered</Text>
              <AnimateNumber useNativeDriver={false} value={stats.recovered} timing="easeIn" style={{fontSize: 36, textAlign: 'center', color: 'lightgreen'}}
                formatter={(val) => {
                  return val.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              />
            </View>

            <View style={[styles.shadow, styles.box]}>
              <Text>Active</Text>
              <AnimateNumber useNativeDriver={false} value={stats.active} timing="easeIn" style={{fontSize: 36, textAlign: 'center', color: 'red'}}
                formatter={(val) => {
                  return val.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              />
            </View>
            {/*<View style={[styles.shadow, styles.box]}>
              <Text>Reported</Text>
              <AnimateNumber value={369854} timing="easeIn" style={{fontSize: 43, textAlign: 'center', color: 'orange'}}
                formatter={(val) => {
                  return val.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              />
            </View>*/}
            <View style={[styles.shadow, styles.box]}>
              <Text>Deaths</Text>
              <AnimateNumber useNativeDriver={false} value={stats.deaths} timing="easeIn" style={{fontSize: 36, textAlign: 'center', color: 'black'}}
                formatter={(val) => {
                  return val.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              />
            </View>

          </View>
        }


      <Text style={[styles.headerText, {marginBottom: 10}]}>Last 7 Days - New Cases</Text>

      <View>
        {graphLoading &&
          <Placeholder
            Animation={Shine}>
            <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
              <PlaceholderLine width={100} style={{height: 200}}/>
            </Card>
          </Placeholder>
        }
        {!graphLoading && graphData.length != 0 &&
          <Card style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginBottom: 10}} elevation={3}>
            <LineChart
            data={{
              labels: sevenDaysAgo,
              datasets: [{data: graphData}]
            }}
            width={styles.box.width * 0.9} // from react-native
            height={180}
            withHorizontalLabels={true}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "2",
                strokeWidth: "2",
                stroke: "red"
              },
              decimalPlaces: 0
            }}
            bezier
            style={{
              marginHorizontal: 'auto',
              marginVertical: 30,
              borderRadius: 16
            }}
          />
          </Card>
        }
      </View>

      <Text style={[styles.headerText, {marginBottom: 10}]}>Cases Worldwide</Text>

      {geolocation != null && worldStatsData.length != 0 &&
        <MapView style={styles.mapStyle}
          initialRegion={{
          latitude: geolocation.coords.latitude,
          longitude: geolocation.coords.longitude,
          latitudeDelta: 80,
          longitudeDelta: 0.0421
        }}>
          {worldStatsData.map((stat, index) => {
            if (stat.data.TotalConfirmed < 5000 || stat.data.TotalConfirmed == 0 || stat.center == undefined) {
              return null;
            }
            return (
              <View key={index}>
              <MapView.Circle
                center={{
                  latitude: stat.center.latitude,
                  longitude: stat.center.longitude,
                }}
                radius={stat.data.TotalConfirmed/5}
                strokeWidth={1}
                strokeColor='rgba(207, 0, 15, 0.8)'
                fillColor='rgba(207, 0, 15, 0.8)'
              >

              </MapView.Circle>
              <Marker tooltip coordinate={{
                latitude: stat.center.latitude,
                longitude: stat.center.longitude,
              }}
              title={stat.data.Country}
              >
                <MaterialCommunityIcons name="pin" color={'white'} style={styles.shadow} size={22} />
                <MapView.Callout>
                  <View style={{ padding: 10, width: 200, marginHorizontal: 'auto' }}>
                    <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', marginBottom: 5}}>{stat.data.Country}</Text>
                    <Text style={{color: 'red', textAlign: 'center', marginBottom: 5}}>New Cases Today: +{stat.data.NewConfirmed}</Text>
                    <Text style={{color: 'green', textAlign: 'center', marginBottom: 5}}>Recovered Today: +{stat.data.NewRecovered}</Text>
                    <Text style={{color: 'black', textAlign: 'center'}}>Total Cases: {stat.data.TotalConfirmed}</Text>
                  </View>


                </MapView.Callout>
               </Marker>
             </View>
            )
          })}
        </MapView>
      }


      {/*<Text style={[styles.headerText, {marginBottom: 10}]}>Infected Population</Text>

      <View style={[styles.shadow, {backgroundColor: '#fff', marginBottom: 40}]}>
        <ProgressChart
          data={data}
          width={SCREEN_WIDTH - 60}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>

      */}

    </ScrollView>
    <ImageBackground source={image} style={styles.image}>
    </ImageBackground>


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 200,
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
    height: 100,
    width: SCREEN_WIDTH -50,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    borderRadius: 5,
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
  },
  newsTitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newsSubTitle: {
    color: 'gray',
  },
  newsTimeAgo: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  mapStyle: {
    width: Dimensions.get('window').width - 50,
    height: 400,
    marginBottom: 50
  },
});
