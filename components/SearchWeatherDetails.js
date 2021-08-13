import React , {useEffect,useState} from 'react'
import { View, Text,Image, SafeAreaView, Dimensions, ActivityIndicator,StyleSheet, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ForecastWeather from './ForecastWeather'
import SearchBar from './SearchBar'
import moment from 'moment-timezone'

export default function SearchWeatherDetails({lat,lon,countryState,stateCity,fetchWeather}) {
    const [weatherData, setWeatherData] = useState(null)
    useEffect (() => {
        weatherResponse();
    
      }, [])
    async function weatherResponse() {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=55717a0063fb0af83c8dbd204ce2242c`)
          if (response.ok) {
            const data = await response.json()
            setWeatherData(data)
            // console.log(data)
          } else {
            setWeatherData(null)
          }
          
        } catch (error) {
          console.log(error)
        }
    }
    

if(weatherData == null) {
  return(
<View style={styles.container}>
  <ActivityIndicator size="large" color="#DC654B"/>
  <StatusBar style="light" />
</View>
)}
else {
  const { current: {clouds,feels_like,humidity,pressure,sunrise,sunset,temp,wind_speed,dew_point,visibility},
        current: {weather : [{description,icon}]}
               
} = weatherData
const iconurl = `http://openweathermap.org/img/wn/${icon}@4x.png`
const sun_rise = new Date(sunrise * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
const sun_set = new Date(sunset * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
const UTC_offset = moment.tz(`${weatherData.timezone}`).format('Z')
    return (
        <SafeAreaView>
        <ScrollView contentContainerStyle={{backgroundColor:'#d9d9d9',width:Dimensions.get('window').width}}>
            <Text style={{fontSize:9,textAlign:'center'}}>For accurate search please enter city name space-seperated by its state name...</Text>
            <SearchBar fetchWeather={fetchWeather}/>
            <View style={{alignItems:'center',marginTop:'8%'}}>
            <Text style={{fontSize:35,fontWeight:'bold',color:"#222222"}}>{stateCity}</Text>
            <Text style={{fontSize:13,fontWeight:'bold',color:"#777777"}}>{countryState}</Text>
            <View style={{backgroundColor:'#222222',padding:10,borderRadius:50,paddingHorizontal:30,marginTop:'3%'}}>
            <Text style={{fontSize:13,fontWeight:'bold',color:"#eeeeee",textAlign:'center'}}>Latitude: {weatherData.lat}</Text>
            <Text style={{fontSize:13,fontWeight:'bold',color:"#eeeeee",textAlign:'center'}}>Longitude: {weatherData.lon}</Text>
            <Text style={{fontSize:13,fontWeight:'bold',color:"#eeeeee",textAlign:'center'}}>{weatherData.timezone} (UTC{UTC_offset})</Text>
            </View>
            <Image style ={styles.weatherIcon} source={{uri: iconurl}} />
            <Text style={{fontSize:35,fontWeight:'bold',color:"#DC654B",marginBottom:'1%'}}>{temp}°c</Text>
            <Text style={{fontSize:18,fontWeight:'bold',textTransform: 'capitalize',color: "#777777",}}>{description}</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={{color:"#DC654B",}}>Cloudiness</Text>
            <Text style={{fontSize:15,fontWeight:'bold',color:"#DC654B",}}>  {clouds}%</Text>
            </View>
            </View>

            <View style={styles.weatherBox}>
            <View>
            <Text style={{fontSize:14,color:'#cccccc'}}>Feels Like</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{feels_like}°c</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Pressure</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{pressure} hPa</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Dew Point</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{dew_point}°c</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Sunrise</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee'}}>{sun_rise}</Text>
            </View>
            <View>
            <Text style={{fontSize:14,color:'#cccccc'}}>Humidity</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{humidity}%</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Wind Speed</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{wind_speed} m/s</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Visibility</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee',marginBottom:'15%'}}>{visibility/1000} km</Text>
            <Text style={{fontSize:14,color:'#cccccc'}}>Sunset</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#eeeeee'}}>{sun_set}</Text>
            </View>
            </View>
            <ForecastWeather weatherData={weatherData}/>
        </ScrollView>
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    
    weatherIcon: {
        width:75,
        height:75,
    },
    container: {
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
        height:Dimensions.get('window').height
      },
    weatherBox: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:'5%',
        backgroundColor:'#222222',
        marginTop:'8%',
        borderRadius:10,
        padding:15,
        paddingHorizontal:45

    }
   
})