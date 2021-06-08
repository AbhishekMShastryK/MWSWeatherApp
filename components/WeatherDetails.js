import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


export default function WeatherDetails({currentWeather, currentJson}) {
    const {
        // main: {feels_like, humidity, pressure},
        wind: {speed},
        sys: {sunrise,sunset}
    } = currentWeather
    const feedSize = currentJson.feeds.length
    const soilMoisture = currentJson.feeds[feedSize-1].field4
    const humidity = currentJson.feeds[feedSize-1].field2
    const pressure = currentJson.feeds[feedSize-1].field3
    const uv_index = currentJson.feeds[feedSize-1].field5
    
    const sun_rise = new Date(sunrise * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    const sun_set = new Date(sunset * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

    const uv = uv_index <= 2  ? `${uv_index},Low` : uv_index > 2 && uv_index <= 5 ? `${uv_index},Moderate` : uv_index > 5 && uv_index <= 7 ? `${uv_index},High` :  uv_index > 7 && uv_index <= 10 ? `${uv_index},VeryHigh` : `${uv_index},Extreme`
    
    return (
        <View style={styles.detailView}>
          <View style={styles.weatherDetails}>
          <View style={{flexDirection:'row',marginBottom:'15%'}}>
            <Ionicons style={{alignSelf:'center',marginRight:'7%'}} name="water" size={28} color="#DC654B" />
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>Humidity</Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{Math.round(humidity*10)/10} %</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginBottom:'15%'}}>
            <FontAwesome5 style={{alignSelf:'center',marginRight:'7%'}} name="water" size={25} color="#DC654B" />
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>Soil Moisture</Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{Math.round(soilMoisture*10)/10} %</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <Feather style={{alignSelf:'center',marginRight:'7%'}} name="sunrise" size={28} color="#DC654B" />
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>Sunrise</Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{sun_rise}</Text>
            </View>
          </View>
          </View> 
          <View style={styles.weatherDetails}>
          <View style={{flexDirection:'row',marginBottom:'13%'}}>
            <MaterialIcons  style={{alignSelf:'center',marginRight:'7%'}} name="speed" size={28} color="#DC654B" /> 
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>Pressure             </Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{Math.round(pressure*10)/10} hPa</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginBottom:'13%'}}>
            <Feather style={{alignSelf:'center',marginRight:'7%'}} name="sun" size={28} color="#DC654B" />
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>UV Index</Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{uv}</Text>
            </View>
          </View> 
          <View style={{flexDirection:'row'}}>
            <Feather style={{alignSelf:'center',marginRight:'7%'}} name="sunset" size={28} color="#DC654B" />
            <View>
            <Text style={{color:'#cccccc',alignSelf:'flex-start',fontSize:14}}>Sunset</Text>
            <Text style={{color:'#eeeeee',alignSelf:'flex-start',fontSize:20,fontWeight:'bold'}}>{sun_set}</Text>
            </View>
          </View>   
          </View>  
        </View>
        
    );
}

const styles = StyleSheet.create ({
    weatherDetails: {  
        // borderWidth:1,
        padding:12,
        backgroundColor:'#222222',
    },
    
    detailView: {
    flexDirection:'row',
    marginLeft:'5%',
    marginRight:'5%',
    backgroundColor:'#222222',
    alignSelf:'center',
    padding:4,
    borderRadius:10,
    marginTop:'9%',
    shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
})