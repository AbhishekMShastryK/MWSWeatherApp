import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import{colors} from '../utils/index'

const {COLOR_CODE1,COLOR_CODE3} = colors
export default function WeatherInfo({currentWeather}) {
    const {main: {temp},weather: [details],name,clouds :{all}} = currentWeather
    const {icon, description} = details
    
    
    const iconurl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.cityName}>{name}</Text>
            <Image style ={styles.weatherIcon} source={{uri: iconurl}} />
            <Text style={styles.textDes}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <View style={styles.weatherDetailRow}>
                <Text style={styles.textDes2}>Cloudiness </Text>
                <Text style={styles.textDes3}>{all}%</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        top:-60
    },
    weatherDescription: {
        fontSize:20,
        textTransform: 'capitalize',
        color: COLOR_CODE3,
        fontWeight: 'bold',
        top:-45
    },
    weatherIcon: {
        width:100,
        height:100,
        top:-45
    },
    textDes: {
        fontSize:45,
        color: COLOR_CODE1,
        top:-50
    },
    textDes2: {
        fontSize:15,
        fontWeight: '600',
        color:COLOR_CODE1,
    },
    textDes3: {
        fontSize:15,
        fontWeight: 'bold',
        color:COLOR_CODE1,
    },
    cityName: {
        fontSize:35,
        color: '#000000',
        fontWeight: 'bold',
        top:-50
    },
    weatherDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top:-45
    },
   
})