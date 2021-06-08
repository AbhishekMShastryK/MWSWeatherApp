import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import{colors} from '../utils/index'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {COLOR_CODE1,COLOR_CODE3} = colors
export default function WeatherInfo({currentWeather,currentJson}) {
    const {weather: [details],name,clouds :{all}} = currentWeather
    const {icon, description} = details
    const feedSize = currentJson.feeds.length
    const temp = currentJson.feeds[feedSize-1].field1
    const aqi = currentJson.feeds[feedSize-1].field6
    
    const iconurl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo} >
            <Text style={styles.cityName}>{name}</Text>
            <Image style ={styles.weatherIcon} source={{uri: iconurl}} />
            <Text style={styles.textDes}>{Math.round(temp*10)/10}°c</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <View style={styles.weatherDetailRow}>
                 <Text style={styles.textDes2}>Cloudiness  </Text>
                 <Text style={styles.textDes3}>{all}%</Text>
             </View>
             <View style={{flexDirection:'row',
                backgroundColor:'#222222',
                padding:7,
                borderRadius:20,
                marginTop:'4%'}}>
                <MaterialCommunityIcons style = {{alignSelf:'center',marginLeft:'0.5%'}} name="leaf" size={20} color={colors.COLOR_CODE1} />
                <Text style={{color:'#cccccc',alignSelf:'center',marginLeft:'0.4%'}}>Air Quality Index   </Text>
                <Text style={{color:'#eeeeee',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>{Math.round(aqi*10)/10} </Text>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    weatherDescription: {
        fontSize:20,
        textTransform: 'capitalize',
        color: COLOR_CODE3,
        fontWeight: 'bold',
    },
    weatherIcon: {
        width:100,
        height:100,
    },
    textDes: {
        fontSize:55,
        color: COLOR_CODE1,
        fontWeight:'bold'
    },
    textDes2: {
        // fontSize:15,
        fontWeight: '600',
        color:COLOR_CODE1,
        alignSelf:'center'
    },
    textDes3: {
        fontSize:16,
        fontWeight: 'bold',
        color:COLOR_CODE1,
        alignSelf:'center'
    },
    cityName: {
        fontSize: 33,
        color: '#222222',
        fontWeight: 'bold',
    },
    weatherDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
   
})