import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {colors} from '../utils/index'
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';


export default function WeatherDetails({currentWeather, unitSystem}) {
    const {
        main: {feels_like, humidity, pressure},
        wind: {speed},
        sys: {sunrise,sunset}
    } = currentWeather

    const sun_rise = new Date(sunrise * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    const sun_set = new Date(sunset * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

    const windSpeed = unitSystem === 'metric' ? `${Math.round(speed*10)/10} m/s` : `${Math.round(speed*10)/10} miles/h`
    
    return (
        
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailRow}>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <FontAwesome name="thermometer" size={26} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>   Feels like</Text>
                            <Text style={styles.textDetails}>   {feels_like}°</Text> 
                        </View>  
                    </View>
                </View>
                <View style={styles.weatherDetailBox}>
                <View style={styles.weatherDetailRow}>
                        <Ionicons name="water" size={28} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>Humidity</Text>
                            <Text style={styles.textDetails}>{humidity} %</Text> 
                        </View>  
                    </View>
                </View>
            </View>
            <View style={{...styles.weatherDetailRow, borderTopWidth:1, borderTopColor:'#d9d9d9'}}>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <Feather name="wind" size={25} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>Wind speed</Text>
                            <Text style={styles.textDetails}>{windSpeed}</Text> 
                        </View>  
                    </View>
                </View>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <Ionicons name="speedometer" size={24} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>Pressure</Text>
                            <Text style={styles.textDetails}>{pressure} hPa</Text> 
                        </View>  
                    </View>
                </View>
            </View> 
            <View style={{...styles.weatherDetailRow, borderTopWidth:1, borderTopColor:'#d9d9d9'}}>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <Feather name="sunrise" size={25} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>Sunrise</Text>
                            <Text style={styles.textDetails}>{sun_rise}</Text> 
                        </View>  
                    </View>
                </View>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <Feather name="sunset" size={25} color={colors.COLOR_CODE1} />
                        <View style={styles.weatherDetailItems}>
                            <Text style={styles.textDetails}>  Sunset  </Text>
                            <Text style={styles.textDetails}>{sun_set}</Text> 
                        </View>  
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    weatherDetails: {
        top:120,
        margin:-70,
        borderWidth:1,
        borderRadius: 10,
        top:0,
        backgroundColor:'#222222',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    weatherDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    weatherDetailBox: {
        padding:20,
        
    },
    weatherDetailItems: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft:20
    },
    textDetails: {
        fontSize: 15,
        color: '#d9d9d9',
        fontWeight: '700',
        alignSelf: 'center' 
    },
})