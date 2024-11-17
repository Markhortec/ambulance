import { View,Dimensions } from "react-native"
import HomeMap from "../../components/HomeMap";
import InitialMessage from "../../components/InitialMessage";
import HomeSearch from "../../components/HomeSearch";
const HomeScreen = () => {

    return (
        <View >
           <>
            {/* map  */}
           <View style={{height:Dimensions.get('window').height-400}}>
           <HomeMap />
            </View> 
            {/* message */}
            <InitialMessage/>
            {/* bottom page */}
            <HomeSearch/>
           </>
        </View>
    )
}

export default HomeScreen;