import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherInfo({currentWeather,currentJson, city, cityState}) {
    const {weather: [details],clouds :{all}} = currentWeather
    const {icon, description} = details
    const feedSize = currentJson.feeds.length
    const temp = currentJson.feeds[feedSize-1].field1
    const aqi = currentJson.feeds[feedSize-1].field6
    
    const aqi_color = aqi <= 50 ? '#a8e05f': aqi > 50 && aqi <= 100 ? '#fdd64b': aqi > 100 && aqi <= 150 ?'#ff9b57': aqi > 150 && aqi <= 200 ? '#fe6a69': aqi > 200 && aqi <= 250 ? '#a97abc':'#a87383'
    const aqi_des = aqi <= 50 ? 'Good': aqi > 50 && aqi <= 100 ? 'Moderate': aqi > 100 && aqi <= 150 ?'Unhealthy for sensitive groups': aqi > 150 && aqi <= 200 ? 'Unhealthy': aqi > 200 && aqi <= 250 ? 'Very Unhealthy':'Hazardous'

    const iconurl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo} >
            <Text style={styles.cityName}>{city}</Text>
            <Text style={styles.stateName}>{cityState}</Text>
            <Image style ={styles.weatherIcon} source={{uri: iconurl}} />
            <Text style={styles.textDes}>{Math.round(temp*10)/10}°c</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <View style={styles.weatherDetailRow}>
                 <Text style={styles.textDes2}>Cloudiness  </Text>
                 <Text style={styles.textDes3}>{all}%</Text>
             </View>
             <View style={{backgroundColor:'#222222',
                padding:11,
                borderRadius:50,
                marginTop:'4%',
                alignItems:'center'}}>
             <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons style = {{alignSelf:'center',marginLeft:'0.5%'}} name="leaf" size={20} color="#DC654B" />
                <Text style={{color:'#cccccc',alignSelf:'center',marginLeft:'0.4%'}}>Air Quality Index   </Text>
                <Text style={{color:'#eeeeee',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>{Math.round(aqi*10)/10} </Text>
             </View>
             <Text style={{alignSelf:'center',color:`${aqi_color}`,fontWeight:'bold'}}>{aqi_des}</Text>
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
        color: "#777777",
        fontWeight: 'bold',
    },
    weatherIcon: {
        width:85,
        height:85,
    },
    textDes: {
        fontSize:45,
        color: "#DC654B",
        fontWeight:'bold'
    },
    textDes2: {
        fontWeight: '600',
        color:"#DC654B",
        alignSelf:'center'
    },
    textDes3: {
        fontSize:16,
        fontWeight: 'bold',
        color:"#DC654B",
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
    stateName: {
        fontSize: 11,
        color: '#777777',
        fontWeight: 'bold',
    },
   
})