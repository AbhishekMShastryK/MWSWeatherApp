import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState,useMemo} from 'react';
import { StyleSheet, Text, View, ActivityIndicator,SafeAreaView, TouchableOpacity,Linking,Dimensions,ScrollView } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import {colors} from './utils/index';
import ReloadIcon from'./components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';
import {LineChart} from 'react-native-chart-kit'

const Stack = createStackNavigator();
const WEATHER_API_KEY = '3d762beabfc99d3f5d8cafddac6724dd'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'



function Home({navigation}) {

  const [errorMessage, setErrorMessage] = useState(null)

  const [currentWeather, setCurrentWeather] = useState(null)

  const [unitSystem, setunitSystem] = useState('metric')
  useEffect(() =>{
    load()
  },[unitSystem])
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return
    }
      const location = await Location.getCurrentPositionAsync()

      const {latitude,longitude} = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      
      const result = await response.json()
      
      if(response.ok){
        setCurrentWeather(result)
        const temp_g = result.main.temp
        const hum_g = result.main.humidity
        const pressure_g = result.main.pressure
        // console.log(temp_g,hum_g,pressure_g)
        window.li = [temp_g,hum_g,pressure_g]
      
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
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style = {{top:500,right:0}}>
          <TouchableOpacity style={{alignItems: "center",
          backgroundColor: '#d9d9d9',
          padding: 5}}
          onPress={() => {navigation.navigate('Details')}} >
          <Text style={{fontWeight:'bold',fontSize:17,color:'black'}}>Go to Details {'>>'}</Text>
          </TouchableOpacity>
        </View>
  
        <StatusBar style="light" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setunitSystem={setunitSystem}/>
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>  
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}/>
      </View>
      
    </SafeAreaView>
  );
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
      <ActivityIndicator size="large" color={colors.COLOR_CODE1}/>
      <StatusBar style="light" />
    </View>
  );
}

}


function DetailsScreen(){

  //const ctime = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  const BASE_MAP_URL = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${WEATHER_API_KEY}`
  
  const temp_d = {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm','6pm','9pm'],
      datasets: [
        {
          data: [li[0]],
          strokeWidth: 2, // optional
        },
      ],
    };

    const hum_d = {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm','6pm','9pm'],
      datasets: [
        {
          data: [li[1]],
          strokeWidth: 2, // optional
        },
      ],
    };
    
    const pressure_d = {
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm','6pm','9pm'],
      datasets: [
        {
          data: [li[2]],
          strokeWidth: 2, // optional
        },
      ],
    };
    
  return (
    <ScrollView >
        <View>
          <Text>Still in developing stage...</Text>
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',marginTop:20}}>
            Temperature
          </Text>
          <LineChart
            data={temp_d}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            // yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#bbbbbb',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <View>
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',marginTop:20}}>
            Humidity
          </Text>
          <LineChart
            data={hum_d}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            // yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#bbbbbb',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <View>
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',marginTop:20}}>
            Pressure
          </Text>
          <LineChart
            data={pressure_d}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            // yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#bbbbbb',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        
    </ScrollView>
    
  );
  
}

function InfoIcon (){
  return(
      <TouchableOpacity title="Infoscreen"
        onPress={() => {Linking.openURL('https://mws-abhishas3.netlify.app/#')}} >
          <View style={styles.InfoIcon}>
              <Octicons name="info" size={25} color={colors.COLOR_CODE1} />
          </View>    
      </TouchableOpacity>
  );
  
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
          } , headerRight: () => <InfoIcon/>,
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
});
