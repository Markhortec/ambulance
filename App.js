import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import HomeNavigator from './src/navigation/Home';
import 'react-native-get-random-values';

navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  // Request permission for Android
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Uber App location  Permission",
          message:
            "Uber App needs access to your location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])

  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default App;



// import React, { Component } from 'react';
// import { StyleSheet, Text, View, PermissionsAndroid, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       errorMessage: null,
//     };
//   }

//   componentDidMount() {
//     this.requestLocationPermission();
//   }

//   // Request location permission for Android
//   requestLocationPermission = async () => {
//     const permissionGranted = await this.checkLocationPermission();
//     if (permissionGranted) {
//       this.checkLocationService();
//     } else {
//       this.setState({ errorMessage: 'Location permission denied' });
//     }
//   };

//   // Check if location permission is granted on Android
//   checkLocationPermission = async () => {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Permission',
//         message: 'We need access to your location to show it on the map.',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     } else {
//       Alert.alert('Permission Denied', 'Location permission is required to use this feature');
//       return false;
//     }
//   };

//   // Check if location service is enabled
//   checkLocationService = () => {
//     console.log("Checking location service...");
//     RNAndroidLocationEnabler.isLocationEnabled()
//       .then((enabled) => {
//         if (enabled) {
//           console.log("Location service enabled");
//           this.getLocation();
//         } else {
//           console.log("Location service is disabled, prompting...");
//           // Prompt to enable location service
//           RNAndroidLocationEnabler.promptForEnable()
//             .then(() => {
//               console.log("Location service enabled after prompt");
//               this.getLocation();
//             })
//             .catch((err) => {
//               console.log('Error enabling location service:', err);
//               this.setState({ errorMessage: 'Unable to enable location services' });
//             });
//         }
//       })
//       .catch((err) => {
//         console.log('Error checking location service:', err);
//         this.setState({ errorMessage: 'Unable to check location service' });
//       });
//   };

//   // Get the current position of the user
//   getLocation = () => {
//     console.log("Getting current position...");
//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log('Current position:', position);
//         this.setState({
//           location: position.coords,
//           errorMessage: null,  // clear error message if location is successfully retrieved
//         });
//       },
//       (error) => {
//         console.log('Error fetching location:', error);
//         this.setState({ errorMessage: `Unable to retrieve location: ${error.message}` });
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   render() {
//     const { location, errorMessage } = this.state;

//     if (errorMessage) {
//       return (
//         <View style={styles.container}>
//           <Text style={styles.errorMessage}>{errorMessage}</Text>
//         </View>
//       );
//     }

//     if (!location) {
//       return (
//         <View style={styles.container}>
//           <Text>Loading location...</Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.container}>
//         <MapView
//           minZoomLevel={6}
//           maxZoomLevel={16}
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
//         </MapView>
//         <Text style={styles.SampleHeader}>Your Current Location</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   SampleHeader: {
//     backgroundColor: '#d9d9d9',
//     paddingTop: 0,
//     paddingBottom: 5,
//     marginLeft: 15,
//     marginRight: 15,
//     marginTop: 5,
//     marginBottom: 5,
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: '300',
//     color: 'black',
//     padding: 5,
//     borderRadius: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   errorMessage: {
//     color: 'red',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 50,
//   },
// });
