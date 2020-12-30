
import * as React from 'react';
import moment from 'moment';
import DEFAULTS from "../default.json";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
} from "rn-placeholder";

import * as WebBrowser from 'expo-web-browser';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ArtcilesScreen({navigation}) {
  const [currentNewsPage, setCurrentNewsPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [news, setNewsData] = useState([])
  useEffect(() => {

    const fetchNews = (c) => {
      setLoading(true)
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const DAYS_AGO = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const NEWS_URL = `https://newsapi.org/v2/everything?q=COVID+World&from=${DAYS_AGO}&language=en&sortBy=publishedAt&apiKey=${DEFAULTS.news.API_KEY}&pageSize=10&page=${currentNewsPage}`

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

  const openBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      {!loading && news ?
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
      {/*<Text>This is Articles</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go to Back"
      />
       <Button
        onPress={() => navigation.openDrawer()}
        title="Open Drawer"
      />
      <View style={[styles.shadow, styles.newsbox]}>
        <Text style={ styles.title }>India takes 10th highly infected countries in global population</Text>
        <Text style={ styles.lastUpdatedText }>updated 1 minute ago</Text>

        <Text style={ styles.subtitle }>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

        <TouchableOpacity style={{position: 'absolute',
        bottom: 20,
        left: 20}}
         onPress={()=> navigation.navigate('ReadMoreScreen')}>
          <Text style={ styles.readMoreButtonText }>Share...</Text>
        </TouchableOpacity>

      </View>
      {/**<View style={[styles.shadow, styles.newsbox]}>
        <Text style={ styles.title }>Box 2</Text>
      </View>
      <View style={[styles.shadow, styles.newsbox]}>
        <Text style={ styles.title }>Box 3</Text>
      </View>
      <View style={[styles.shadow, styles.newsbox]}>
        <Text style={ styles.title }>Box 4</Text>
      </View>*/}
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "darkgray"
  },
  readMoreButtonText: {
    color: "#147efb",
    fontSize: 18,
    fontWeight: "bold",

  },
  lastUpdatedText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },
  newsbox: {
    height: 1500,
    width: SCREEN_WIDTH -50,
    backgroundColor: '#fff',
    margin: 5,
    padding: 20,
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
})
