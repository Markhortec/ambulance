import React, { useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import RouteMap from "../../components/RouteMap";
import UberTypes from "../../components/UberTypes";
import { useRoute, useNavigation } from '@react-navigation/native';

const SearchResults = (props) => {
  const typeState = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { originPlace, destinationPlace } = route.params;

  const onSubmit = () => {
    const [type] = typeState;
    if (!type) {
      Alert.alert("Select a ride type", "Please select a ride type to continue.");
      return;
    }

    // Navigate to a dummy OrderPage with mock data
    navigation.navigate('OrderPage', {
      id: "mock-order-id",
      type,
      origin: {
        latitude: originPlace.details.geometry.location.lat,
        longitude: originPlace.details.geometry.location.lng,
      },
      destination: {
        latitude: destinationPlace.details.geometry.location.lat,
        longitude: destinationPlace.details.geometry.location.lng,
      },
    });
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
      <View style={{ height: Dimensions.get('window').height - 380 }}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <View style={{ height: 380 }}>
        <UberTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

export default SearchResults;
