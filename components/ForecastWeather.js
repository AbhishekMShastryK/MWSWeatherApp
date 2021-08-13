import React from 'react'
import { View,Text,Image,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment-timezone'

export default function ForecastWeather({weatherData}) {
  
    return (
        <ScrollView horizontal={true} style={{backgroundColor:'#DC654B',marginTop:'4%',padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[0].weather[0].icon}@4x.png`}} />
            <View>
            <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',marginBottom:8}}>Today</Text>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[0].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[0].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[0].temp.max}°c / {weatherData.daily[0].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[0].weather[0].description}</Text>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[1].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[1].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[1].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[1].temp.max}°c / {weatherData.daily[1].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[1].weather[0].description}</Text>
            </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[2].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[2].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[2].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[2].temp.max}°c / {weatherData.daily[2].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[2].weather[0].description}</Text>
            </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[3].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[3].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[3].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[3].temp.max}°c / {weatherData.daily[3].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[3].weather[0].description}</Text>
            </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[4].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[4].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[4].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[4].temp.max}°c / {weatherData.daily[4].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[4].weather[0].description}</Text>
            </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[5].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[5].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[5].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[5].temp.max}°c / {weatherData.daily[5].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[5].weather[0].description}</Text>
            </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={styles.forecastBox}>
            <Image style ={styles.weatherIcon} source={{uri: `http://openweathermap.org/img/wn/${weatherData.daily[6].weather[0].icon}@4x.png`}} />
            <View>
            <View style={styles.dayText}>
            <Text style={styles.weekDay}>{moment(weatherData.daily[6].dt*1000).format('dddd')}</Text>
            <Text style={styles.dateText}>{moment(weatherData.daily[6].dt*1000).format('Do MMM')}</Text>
            </View>
            <Text style={styles.tempText}>{weatherData.daily[6].temp.max}°c / {weatherData.daily[6].temp.min}°c</Text>
            <Text style={styles.desText}>{weatherData.daily[6].weather[0].description}</Text>
            </View>
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    weatherIcon: {
        width:90,
        height:90,
    },
    forecastBox: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#d9d9d9',
        padding:20,
        borderRadius:15,
        borderWidth:2,
        marginRight:20
    },
    dayText: {

        backgroundColor:'#222222',
        borderRadius:10,
        padding:3,
    },
    tempText : {
        fontSize:18,
        fontWeight:'700',
        color:'#DC654B',
        textAlign:'center',
    },
    desText : {
        textTransform:'capitalize',
        textAlign:'center',
        color:'#222222',
        fontWeight:'bold'
    },
    weekDay: {
        color:'#eeeeee',
        fontSize:17,
        textAlign:'center',
        fontWeight:'bold'
    },
    dateText: {
        color:'#eeeeee',
        fontSize:10,
        textAlign:'center',
    }

})

