import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function ReloadIcon({load}) {
    return (
        <View style={styles.reloadIcon}>
            <FontAwesome onPress ={load} name="refresh" size={34} color="#DC654B" />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
    alignSelf:'center',
    marginTop:'5%',
    
    },
})