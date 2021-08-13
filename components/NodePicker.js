import React from 'react';
import { View } from 'react-native'
import {Picker } from '@react-native-picker/picker'

const NodePicker = ({nodeValue,setNodeValue}) => {
    
    return (
      <View style={{marginBottom:'3%',alignSelf:'flex-end',marginTop:'3%'}}>
      <Picker
          selectedValue={nodeValue}
          onValueChange={(itemValue) =>
          setNodeValue(itemValue) } mode='dropdown'
          style={{  width: 120,color:'#DC654B' }}>
          <Picker.Item label="Node 1" value="1384648" />
          <Picker.Item label="Node 2" value="1392064" />
      </Picker>
      </View>
    )
}

export default NodePicker


