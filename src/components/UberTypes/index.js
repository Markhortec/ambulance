import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import UberTypeRow from '../UberTypeRow';
import typesData from '../../assets/data/types';

const UberTypes = ({ typeState, onSubmit }) => {
  const [selectedType, setSelectedType] = typeState;

  return (
    <View>
      {typesData.map((type) => (
        <UberTypeRow
          type={type}
          key={type.id}
          isSelected={type.type === selectedType}
          onPress={() => setSelectedType(type.type)}
        />
      ))}

      <Pressable
        onPress={() => {
          if (selectedType) {
            onSubmit();
          } else {
            Alert.alert("No Selection", "Please select an Uber type before confirming.");
          }
        }}
        style={{
          backgroundColor: selectedType ? 'black' : 'gray',
          padding: 10,
          margin: 10,
          alignItems: 'center',
        }}
        disabled={!selectedType}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
