import React, {useState, useEffect} from 'react';
import {View,  SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import PlaceRow from './PlaceRow';
import styles from './styles';

navigator.geolocation = require('@react-native-community/geolocation');

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 33.6335, lng: 73.0699 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 31.8492, lng: 79.0619} },
};

const DestinationSearch = (props) => {
    const [originPlace, setOriginPlace] = useState(null);
    const [destinationPlace, setDestinationPlace] = useState(null);
  
    const navigation = useNavigation();
  
    const checkNavigation = () => {
      if (originPlace && destinationPlace) {
        navigation.navigate('SearchResults', {
          originPlace,
          destinationPlace,
        })
      }
    }
  
    useEffect(() => {
      checkNavigation();
    }, [originPlace, destinationPlace]);
  
    return (
      <SafeAreaView>
        <View style={styles.container}>
  
          <GooglePlacesAutocomplete
            placeholder="Where from?"
            onPress={(data, details = null) => {
              setOriginPlace({data, details});
              // console.log(data,details);
            }}
            
            enablePoweredByContainer={false}
            suppressDefaultStyles
            currentLocation={true}
            currentLocationLabel='Current location'
            styles={{
              textInput: styles.textInput,
              container: styles.autocompleteContainer,
              listView: styles.listView,
              separator: styles.separator,
            }}
            fetchDetails
            query={{
              key: 'AIzaSyB5NsoJnZaejyWinMVs5pjlJFVW97OGtN4',
              language: 'en',
            }}
            renderRow={(data) => <PlaceRow data={data} />}
            renderDescription={(data) => data.description || data.vicinity}
            predefinedPlaces={[homePlace, workPlace]}
          />
  
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            onPress={(data, details = null) => {
              setDestinationPlace({data, details});
              // console.log("destination",data,details);
            }}
            enablePoweredByContainer={false}
            suppressDefaultStyles
            styles={{
              textInput: styles.textInput,
              container: {
                ...styles.autocompleteContainer,
                top: 55,
              },
              separator: styles.separator,
            }}
            fetchDetails
            query={{
              key: 'AIzaSyB5NsoJnZaejyWinMVs5pjlJFVW97OGtN4',
              language: 'en',
            }}
            renderRow={(data) => <PlaceRow data={data} />}
            renderDescription={(data) => data.description || data.vicinity}
          />
  
          {/* Circle near Origin input */}
          <View style={styles.circle} />
  
          {/* Line between dots */}
          <View style={styles.line} />
  
          {/* Square near Destination input */}
          <View style={styles.square} />
  
        </View>
      </SafeAreaView>
    );
  };
  
  export default DestinationSearch;
  
// import React, {useState, useEffect} from 'react';
// import {View, TextInput, SafeAreaView} from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useNavigation } from '@react-navigation/native';

// import styles from './styles.js';
// import PlaceRow from "./PlaceRow.js";

// const homePlace = {
//   description: 'Home',
//   geometry: { location: { lat: 33.8152937, lng: 72.4597668 } },
// };
// const workPlace = {
//   description: 'Work',
//   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
// };

// const DestinationSearch = (props) => {
//   const [originPlace, setOriginPlace] = useState(null);
//   const [destinationPlace, setDestinationPlace] = useState(null);

//   const navigation = useNavigation();

//   const checkNavigation = () => {
//     if (originPlace && destinationPlace) {
//       navigation.navigate('SearchResults', {
//         originPlace,
//         destinationPlace,
//       })
//     }
//   }

//   useEffect(() => {
//     checkNavigation();
//   }, [originPlace, destinationPlace]);

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>

//         <GooglePlacesAutocomplete
//           placeholder="Where from?"
//           onPress={(data, details = null) => {
//             setOriginPlace({data, details});
//           }}
//           enablePoweredByContainer={false}
//           suppressDefaultStyles
//           currentLocation={true}
//           currentLocationLabel='Current location'
//           styles={{
//             textInput: styles.textInput,
//             container: styles.autocompleteContainer,
//             listView: styles.listView,
//             separator: styles.separator,
//           }}
//           fetchDetails
//           query={{
//             key: 'AIzaSyB5NsoJnZaejyWinMVs5pjlJFVW97OGtN4',
//             language: 'en',
//           }}
//           renderRow={(data) => <PlaceRow data={data} />}
//           renderDescription={(data) => data.description || data.vicinity}
//           predefinedPlaces={[homePlace, workPlace]}
//         />

//         <GooglePlacesAutocomplete
//           placeholder="Where to?"
//           onPress={(data, details = null) => {
//             setDestinationPlace({data, details});
//           }}
//           enablePoweredByContainer={false}
//           suppressDefaultStyles
//           styles={{
//             textInput: styles.textInput,
//             container: {
//               ...styles.autocompleteContainer,
//               top: 55,
//             },
//             separator: styles.separator,
//           }}
//           fetchDetails
//           query={{
//             key: 'AIzaSyB5NsoJnZaejyWinMVs5pjlJFVW97OGtN4',
//             language: 'en',
//           }}
//           renderRow={(data) => <PlaceRow data={data} />}
//         />

//         {/* Circle near Origin input */}
//         <View style={styles.circle} />

//         {/* Line between dots */}
//         <View style={styles.line} />

//         {/* Square near Destination input */}
//         <View style={styles.square} />

//       </View>
//     </SafeAreaView>
//   );
// };

// export default DestinationSearch;