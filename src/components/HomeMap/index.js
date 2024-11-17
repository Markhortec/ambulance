import React from "react";
import { View, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import cars from "../../assets/data/cars"; // Import the car data

const HomeMap = () => {

  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  }

  return (
    <View style={{ height: 390, backgroundColor: '#a0abff', justifyContent: "center", alignItems: 'center' }}>
     <MapView
  style={{ width: '100%', height: '100%' }}
  provider={PROVIDER_GOOGLE}
  showsUserLocation={true}
  showsMyLocationButton={true}
  onMapReady={() => console.log("Map is ready!")}
  onMapError={(error) => console.error("Map Error:", error)}
  initialRegion={{
    latitude: 33.6179,
    longitude: 72.9373,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  }}
>

        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
          >
            <Image 
              style={{ width: 40, height: 40, resizeMode: 'contain',
                transform:[{rotate:`${car.heading}deg`}]
               }}
              source={getImage(car.type)} 
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default HomeMap;
