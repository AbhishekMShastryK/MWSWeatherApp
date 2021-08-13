import React, {useState} from 'react'
import { View, TextInput, StyleSheet,Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar({fetchWeather}) {
    const [city, setCity] = useState('')
    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder = 'Enter city...'
                value = {city}
                onChangeText={(text) => setCity(text)}
                maxLength={50}
            />
            <View style={{justifyContent:'center',flexDirection:'column'}}>
            <Text style={{fontSize:8,alignSelf:'center',fontWeight:'bold',color:'#777777',marginTop:'-12%'}}>search</Text>
            <FontAwesome5 onPress={() => fetchWeather(city)} style={{alignSelf:'center'}} name="search-location" size={24} color="#DC654B" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop:'6%',
        borderWidth:2,
        marginHorizontal:'10%',
        borderRadius:40,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor:'#eeeeee'

    }
})