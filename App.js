import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator,RefreshControl, TouchableOpacity,Linking,Dimensions,ScrollView, Image } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import ReloadIcon from'./components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { WebView } from 'react-native-webview';
import NodePicker from './components/NodePicker';

const Stack = createStackNavigator();
const WEATHER_API_KEY = '3d762beabfc99d3f5d8cafddac6724dd'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'


function Home({navigation}) {
 
  const [errorMessage, setErrorMessage] = useState(null)
  const [nodeValue, setNodeValue] = useState('1392796');
  const [currentWeather, setCurrentWeather] = useState(null)
  const [currentJson, setCurrentJson]  = useState(null)
  
  
 const [unitSystem, setunitSystem] = useState('metric')
  useEffect(() =>{
    load()
  },[unitSystem,nodeValue])
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
  
    

    try{
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return
    }
    window.nodeval = nodeValue
    const res = await fetch(`https://api.thingspeak.com/channels/${nodeValue}/feeds.json`)
    const res1 = await fetch(`https://api.thingspeak.com/channels/1384648/feeds.json`)
    const res2 = await fetch(`https://api.thingspeak.com/channels/1392064/feeds.json`)
    const myJson = await res.json()
    const myJson1 = await res1.json()
    const myJson2 = await res2.json()
      if (myJson) {
        setCurrentJson(myJson)
      }

      // const location = await Location.getCurrentPositionAsync()
      
      const latitude1 = myJson1.channel.latitude
      const longitude1 = myJson1.channel.longitude
      window.lat1 = parseFloat(latitude1)
      window.lng1 = parseFloat(longitude1)
      const latitude2 = myJson2.channel.latitude
      const longitude2 = myJson2.channel.longitude
      window.lat2 = parseFloat(latitude2)
      window.lng2 = parseFloat(longitude2)
      window.channelDataLastEntryID = myJson.channel.last_entry_id
      
     
      
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
  return (<ScrollView contentContainerStyle={{backgroundColor:'#d9d9d9',flex:1}} refreshControl={<RefreshControl onRefresh={load} />} >
    <StatusBar style="light" />
    <NodePicker nodeValue={nodeValue} setNodeValue={setNodeValue}/>
    <WeatherInfo currentWeather={currentWeather} currentJson={currentJson} />
    <WeatherDetails currentWeather={currentWeather} currentJson={currentJson}/>
    <TouchableOpacity style={{alignItems: "center",
           backgroundColor: '#d9d9d9',
           padding: 5,marginTop:'7%'}}
           onPress={() => {navigation.navigate('Details')}} >
           <Text style={{fontWeight:'bold',fontSize:17,color:'black'}}>Go to Details {'>>'}</Text>
           </TouchableOpacity>

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
  const iframe1 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src='https://thingspeak.com/channels/${nodeval}/charts/1?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=Temperature&type=line'></iframe>`;
  const iframe2 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/2?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=Humidity&type=line"></iframe>`;
  const iframe3 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/3?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=Pressure&type=line"></iframe>`;
  const iframe4 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/4?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=Soil+Moisture&type=line"></iframe>`;
  const iframe5 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/5?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=UV+Index&type=line"></iframe>`;
  const iframe6 = `<iframe width="370" height="230" style="border: 3px solid #222222;" src="https://thingspeak.com/channels/${nodeval}/charts/6?height=230&width=370&bgcolor=%23eeeeee&color=%23333333&dynamic=true&results=15&title=Air+Quality+Index&type=line"></iframe>`; 
  
  return (
    <ScrollView style={{backgroundColor:'#d9d9d9'}}>
        <View>
          <TouchableOpacity style={{alignItems: "center",
          backgroundColor: '#222222',
          marginRight:'25%',
          marginLeft:'25%',
          marginTop:'5%',
          padding: 8}}
          onPress={() => {Linking.openURL('https://mwsdata.netlify.app/')}} >
          <Text style={{fontWeight:'bold',fontSize:20,color:'#dddddd'}}>Download Data</Text>
          </TouchableOpacity>
          <Text style={styles.maptitle}>MWS Node Location</Text>
          <MapView style={styles.map}
          initialRegion={{
            latitude: lat1,
            longitude: lng1,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true} >
          <MapView.Marker 
            coordinate={{
              latitude: lat1,
              longitude: lng1,
            }}
            title={"Node 1"}
            description={`latitude: ${lat1}    longitude: ${lng1}`}/>
            <MapView.Marker 
            coordinate={{
              latitude: lat2,
              longitude: lng2,
            }}
            title={"Node 2"}
            description={`latitude: ${lat2}    longitude: ${lng2}`}/>
          </MapView>
        </View>
        <Text style={styles.graphtitle}>Weather Plot</Text>
        <WebView
          scalesPageToFit={false}
          bounces={false}
          javaScriptEnabled
          style={{ height: 1470, width: Dimensions.get('window').width, backgroundColor:'#DC654B', }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head> 
                    <body>
                      <div id="baseDiv">${iframe1} ${iframe2} ${iframe3} ${iframe4} ${iframe5} ${iframe6}</div>
                    </body>
                  </html>
            `,
          }}
          automaticallyAdjustContentInsets={false}
        />
        
        
    </ScrollView>
    
  );
}

function InfoIcon (){
  return(
      <TouchableOpacity title="Infoscreen"
        onPress={() => {Linking.openURL('https://mws-abhishas3.netlify.app/#')}} >
          <View style={styles.InfoIcon}>
              <Octicons name="info" size={25} color="#DC654B" />
          </View>    
      </TouchableOpacity>
  );
  
}
// const ActionBarImage = () => {
//   return (
//     <View style={{flexDirection: 'row'}}>
//       <Image
//         source={{
//           uri:
//             'https://i.ibb.co/VTvLGnT/wappicon1.jpg',
//         }}
//         style={{
//           width: 40,
//           height: 40,
//           marginLeft: 15,
//         }}
//       />
//     </View>
//   );
// };
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
          // headerLeft: () => <ActionBarImage />,
          headerTitleAlign:'center'
        }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#222222',
          }, 
          headerTintColor: '#d9d9d9',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
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
    height: 20,
    borderRadius: 20,
},
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height*(60/100),
  alignSelf:'center',
  
},
maptitle: {
  padding:10,
  backgroundColor:'#DC654B',
  color:'#222222',
  alignSelf: 'center',
  marginTop:'10%',
  width:'85%',
  textAlign:'center',
  fontSize:20,
  fontWeight:'bold',
},
graphtitle: {
  padding:10,
  backgroundColor:'#222222',
  color:'#dddddd',
  alignSelf: 'center',
  marginTop:'11%',
  width:'85%',
  textAlign:'center',
  fontSize:20,
  fontWeight:'bold',
}
});
