import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {colors} from '../utils/index';
export default function ReloadIcon({load}) {
    return (
        <View style={styles.reloadIcon}>
            <FontAwesome onPress ={load} name="refresh" size={25} color={colors.COLOR_CODE1} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
    position: 'absolute',
    top: -170,
    right: -80
    },
})