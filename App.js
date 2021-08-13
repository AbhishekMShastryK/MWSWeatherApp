import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator,RefreshControl, TouchableOpacity,Linking,Dimensions,ScrollView, SafeAreaView, TextInput, } from 'react-native';
import WeatherInfo from './components/WeatherInfo';
import ReloadIcon from'./components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { Octicons,FontAwesome5  } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import NodePicker from './components/NodePicker';
import SearchWeatherDetails from './components/SearchWeatherDetails';
import SearchBar from './components/SearchBar';

const Stack = createStackNavigator();
const WEATHER_API_KEY = '3d762beabfc99d3f5d8cafddac6724dd'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const TOMTOM_API_KEY = 'BcL5zef3PjGFKFSXBHOMWWAk566zqItb'

function Home({navigation}) {
 
  const [errorMessage, setErrorMessage] = useState(null)
  const [nodeValue, setNodeValue] = useState('1384648');
  const [currentWeather, setCurrentWeather] = useState(null)
  const [currentJson, setCurrentJson]  = useState(null)
  const [city, setCity] = useState()
  const [cityState, setCityState ] = useState()
  
 const [unitSystem, setunitSystem] = useState('metric')
  useEffect(() =>{
    load()
  },[unitSystem,nodeValue])
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
  
    try{

    const res = await fetch(`https://api.thingspeak.com/channels/${nodeValue}/feeds.json`)
    const myJson = await res.json()

      if (myJson) {
        setCurrentJson(myJson)
      }
      window.nodeval = nodeValue
      const latitude1 = myJson.channel.latitude
      const longitude1 = myJson.channel.longitude
      
      const loc = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${latitude1},${longitude1}.json?key=${TOMTOM_API_KEY}`)
      const coordResponse = await loc.json()
      if (coordResponse) {
        setCity(coordResponse.addresses[0].address.municipalitySubdivision)
        setCityState(coordResponse.addresses[0].address.countrySubdivision)
      }
      
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude1}&lon=${longitude1}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      
      const result = await response.json()
      
      if(response.ok){
        setCurrentWeather(result)
      
      }
      
      else{
        setErrorMessage(result.message)
      }
 
    } catch(error) {
      setErrorMessage(error.message)
    }
  }

if(currentWeather){
  return (
  <ScrollView style={{backgroundColor:'#d9d9d9',width:Dimensions.get('window').width}} refreshControl={<RefreshControl onRefresh={load} />} >
    <StatusBar style="light" />
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity style={{
           backgroundColor: '#d9d9d9',
           padding: 5,
          marginLeft:'6%',
        marginTop:'5%'}}
           onPress={() => {navigation.navigate('Search')}} >
           <FontAwesome5 name="search" size={30} color="#DC654B" />
           </TouchableOpacity>
    <NodePicker nodeValue={nodeValue} setNodeValue={setNodeValue}/>
    </View>
    <WeatherInfo currentWeather={currentWeather} currentJson={currentJson} city={city} cityState={cityState}/>
    <WeatherDetails currentWeather={currentWeather} currentJson={currentJson}/>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'7%',marginLeft:'10%',marginRight:'10%'}}>
    <TouchableOpacity style={{
           backgroundColor: '#d9d9d9',
           padding: 5,}}
           onPress={() => {navigation.navigate('Details')}} >
           <Text style={{fontWeight:'bold',fontSize:17,color:'#222222'}}>Weather Plot</Text>
           </TouchableOpacity>
    <TouchableOpacity style={{
           backgroundColor: '#d9d9d9',
           padding: 5,}}
           onPress={() => {Linking.openURL('https://mwsdata.netlify.app/')}} >
           <Text style={{fontWeight:'bold',fontSize:17,color:'#222222'}}>Download Data</Text>
           </TouchableOpacity>
    </View>
   </ScrollView>);
}
else if (errorMessage){
  return (
    
    <View style={styles.container}>
      <ReloadIcon load={load}/>
      <Text>{errorMessage}</Text>
      <StatusBar style="light" />
    </View>
  )
}
else {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#DC654B"/>
      <StatusBar style="light" />
    </View>
  );
}

}

function DetailsScreen(){
  const [value, onChangeText] = useState('15')
  const iframe1 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src='https://thingspeak.com/channels/${nodeval}/charts/1?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Temperature&type=line'></iframe>`;
  const iframe2 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/2?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Humidity&type=line"></iframe>`;
  const iframe3 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/3?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Pressure&type=line"></iframe>`;
  const iframe4 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/4?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Soil+Moisture&type=line"></iframe>`;
  const iframe5 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/5?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=UV+Index&type=line"></iframe>`;
  const iframe6 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/6?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Air+Quality+Index&type=line"></iframe>`;
  const iframe7 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/7?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Heat+Index&type=line"></iframe>`;
  const iframe8 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/8?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=${value}&title=Dew+Point&type=line"></iframe>`; 
  
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{backgroundColor:'#d9d9d9',width:Dimensions.get('window').width}}>
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:'5%',marginTop:'3%'}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#222222',marginLeft:'2%'}}>Number of results to be viewed:  </Text>
        <TextInput
      style={{ height: 30, borderColor: '#DC654B', borderWidth: 2,textAlign:'left',padding:5 }}
      keyboardType={'numeric'}
      maxLength={6}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    </View>   
        <WebView
          scalesPageToFit={false}
          bounces={false}
          javaScriptEnabled
          style={{ height: 1950, width: Dimensions.get('window').width, backgroundColor:'#DC654B' }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html> 
                  <style>
                   body {
                    display:flex; 
                    flex-direction:column; 
                    text-align:center;
                  }
                  </style>
                    <body>
                      <div>${iframe1} ${iframe2} ${iframe3} ${iframe4} ${iframe5} ${iframe6} ${iframe7} ${iframe8}</div>
                    </body>
                  </html>
            `,
          }}
          automaticallyAdjustContentInsets={true}
        />
        
    </ScrollView>
    </SafeAreaView>
    
  );
}

function InfoIcon (){
  return(
      <TouchableOpacity title="Infoscreen"
        onPress={() => {Linking.openURL('https://mws-abhishas3.netlify.app')}} >
          <View style={styles.InfoIcon}>
              <Octicons name="info" size={25} color="#DC654B" />
          </View>    
      </TouchableOpacity>
  );
  
}

function SearchScreen() {
  const [loaded, setLoaded] = useState(true)
  const [lat, setLat] = useState(13.34373)
  const [lon, setLon] = useState(74.74664)
  const [countryState,setCountryState] = useState('')
  const [stateCity,setStateCity] = useState('')
  const [tom_res, setTomRes] = useState(null)

  useEffect (() => {
    fetchWeather('udupi');

  }, [])
  async function fetchWeather(city) {
    setLoaded(false)
    if (city == '')
    {
      setLoaded(true)
      setTomRes(null)
    }
    else {
    const tom_api = `https://api.tomtom.com/search/2/geocode/${city}.json?key=BcL5zef3PjGFKFSXBHOMWWAk566zqItb`
    try {
      const tom_loc = await fetch(tom_api)
      const tom_res = await tom_loc.json()
      if (tom_res.summary.numResults != 0) {
        setTomRes(tom_res)
        setLat(tom_res.results[0].position.lat)
        setLon(tom_res.results[0].position.lon)
        setCountryState(tom_res.results[0].address.countrySubdivision)
        if (tom_res.results[0].address.municipality) {
          setStateCity(tom_res.results[0].address.municipality)
        }
        else {
          setStateCity(city)
        }
      }
      else {
        setTomRes(null)
      }
      setLoaded(true)
      
    } catch (error) {
      console.log(error)
    }
  }
}
  
  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DC654B"/>
        <StatusBar style="light" />
      </View>
    )
  }
  else if (tom_res === null) {
    return(
      <View style={{backgroundColor:'#d9d9d9',flex:1}}>
        <Text style={{fontSize:9,textAlign:'center'}}>For accurate search please enter city name space-seperated by its state name...</Text>
        <SearchBar fetchWeather={fetchWeather}/>
        <Text style={{marginTop:'10%',fontSize:15,textAlign:'center'}}>City not found! Try with a different city name...</Text>
      </View>
    )
  }
 return (
   <View >
     <SearchWeatherDetails lat={lat} lon={lon} countryState={countryState} stateCity={stateCity} fetchWeather={fetchWeather}/>
   </View>
 )
  
}

export default function App (){
 
  return (

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Micro Weather Station',
          headerStyle: {
            backgroundColor: '#222222',
            
          },
          headerTintColor: '#d9d9d9',
          headerTitleStyle: {
            fontWeight: 'bold',
          } , headerRight: () => <InfoIcon />,
          headerTitleAlign:'center'
        }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{
          title: 'Weather Plot',
          headerStyle: {
            backgroundColor: '#222222',
          }, 
          headerTintColor: '#d9d9d9',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS,
          headerTitleAlign:'center'
        }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{
          title: 'Search',
          headerStyle: {
            backgroundColor: '#222222',
          }, 
          headerTintColor: '#d9d9d9',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, cardStyleInterpolator:CardStyleInterpolators.forScaleFromCenterAndroid,
          headerTitleAlign:'center'
        }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InfoIcon: {
    width: 44,
    height: 22,
},
searchBox: {
  borderWidth:2,
  borderColor:'#777777',
  padding:4,
  marginLeft:'3%',
  marginTop:'4%',
  borderRadius:15,
  marginRight:'3%'
}
});
