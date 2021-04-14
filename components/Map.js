import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker, Callout} from'react-native-maps';
import * as Location from 'expo-location';
import { Header } from 'react-native-elements';
import { Text } from 'react-native-elements';
import{ Icon } from'react-native-elements';
import { LogBox } from 'react-native';
//import { useRef } from 'react';

function Map ({navigation, route}) {
  LogBox.ignoreLogs(['Setting a timer']);
  const [position, setPosition] = useState({latitude: 60.17, longitude: 24.94});
  const [positionMarker, setPositionMarker] = useState({latitude: 100, longitude: 200});
  const [placeMarkers, setPlaceMarkers] = useState([{position: {latitude: 100, longitude: 200}, berry: '', placeName: ''}]);
  const [coordinatesFromMap, setCoordinatesFromMap] = useState(false);
  const [userPosition, setUserPosition] = useState({latitude: 0, longitude: 0});
  //100 ja 200
  //const [markerText, setMarkerText] = useState('');

  //??
  //const markerRef = useRef();
  //saattaa heittää välillä 0, 0:aan, onko silloin, jos ei ole katsonut yhtään paikkaa
  //pois päältä ottaessa menee, jos ei liikuta ollenkaan karttaa, kun tulee show placeista
  //Entä jos tämäkin olis state?
  currentMapPosition = {latitude: 60.17, longitude: 37};

  
 
  if (route.params) {
    //console.log("Map: route.params", route.params);
    if (route.params.placePermission) {
      setPlaceMarkers(route.params.selectedBerryPlaces);
      console.log("placeMarkers", placeMarkers);
      markerRef.hideCallout();
      const placePosition = route.params.selectedBerryPlaces[0].position;
      currentMapPosition = {latitude: placePosition.latitude,  longitude: placePosition.longitude};
      setPosition({latitude: placePosition.latitude, longitude: placePosition.longitude});
      console.log("placepositionLatitude", placePosition.latitude);
      route.params.placePermission = false;
    }
  }
  
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async() => {
    let { status} = await Location.requestPermissionsAsync();
    if(status !== 'granted') {
      Alert.alert('No permission to accesslocation');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setPosition({latitude: location.coords.latitude, longitude: location.coords.longitude});
      setUserPosition({latitude: location.coords.latitude, longitude: location.coords.longitude});
      setPositionMarker({latitude: location.coords.latitude, longitude: location.coords.longitude});
    }
  }

  const updateMapPosition = (region) => {
    currentMapPosition = {latitude: region.latitude, longitude: region.longitude};
  }
  
  //Handles user's selection if coordinates are selected from the map
  const handleCoordinatesSelection = () => {
    //marker.showCallout();
    //markerRef.hideCallout();
    if (coordinatesFromMap === false) {
      setPosition(currentMapPosition);
      setCoordinatesFromMap(true);
      //console.log("handleCoordinatesSelection: coordinatesFromMap", coordinatesFromMap);
      Alert.alert(
        'You can select a location by clicking on the map.',
        '',
        [
          { 
            text: "OK", onPress: () => {} 
          }
        ]
      );
    } else {
      setCoordinatesFromMap(false);
      setPosition(currentMapPosition);
    }
    console.log("handleCoordinatesSelection", coordinatesFromMap);
  }

  //Function is executed if user save his own position coordinates
  const selectOwnLocation = () => {
    navigation.navigate('Save new place', {position: userPosition});
  }

  //Function is executed if user select coordinates by clickng on the map
  const selectPlaceFromMap = (event) => {
    //console.log(event.nativeEvent.coordinate);
    console.log("SelectPlaceFromMap: coordinatesFromMap", coordinatesFromMap);
    if (coordinatesFromMap) {
      //console.log(event.nativeEvent.coordinate);
      navigation.navigate('Save new place', {position: event.nativeEvent.coordinate});
    }
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {selectOwnLocation}>Save</Text>}
        centerComponent={<Text h4 onPress = {() => navigation.navigate('Berry places')}>Show places</Text>}
        rightComponent = {<Text h4 onPress = {() => navigation.navigate('Help')}>Help</Text>}
      />
      <MapView
        mapType='hybrid'
        style={styles.mapViewStyle}
        onPress={selectPlaceFromMap}
        onRegionChangeComplete={updateMapPosition}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta:0.0032,
          longitudeDelta:0.0021,
        }}>      
        <Marker
          coordinate={{
            latitude: positionMarker.latitude,
            longitude: positionMarker.longitude
          }}
          title='You are here'
        >
         
        </Marker>
          {placeMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.position.latitude,
                longitude: marker.position.longitude
              }}
              ref={ref => {
                markerRef = ref;
              }}
              title={`${marker.berry}`}
              description={`${marker.placeName} ${marker.time}`}
            >
          </Marker>
        ))}
        
      </MapView>
      <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'flex-end'}}>
     
      <Icon reverse name='pointer' type='evilicon' color={coordinatesFromMap ? 'green' : 'grey'} onPress={handleCoordinatesSelection}/>
        </View>
        <View style={{position: 'absolute', alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
      <Icon reverse name='locate-outline' type='ionicon' color='#0000FF' onPress={getLocation}/>
        </View>  
        <StatusBar style="auto" />
      
    </View>
  );          
}

//

/*<Marker
                pinColor="red"
                ref={ref => {
                  this.marker = ref;
                }}
                coordinate={coords}
                title={title}
                description={description}
              >
                {Platform.OS === "ios" ? (
                  <Callout
                    tooltip={true}
                    style={styles.callout}
                  >
                    <Text style={styles.title}>
											{title}
                    </Text>
                    <Text style={styles.description}>
                      {description}
                    </Text>
                  </Callout>
                ): null }
</Marker>*/




/*title={`${marker.berry}`}
            description={`${marker.placeName} ${marker.time}`}*/

            /*<Callout tooltip>
            <View style={styles.callOutStyle}>
              <Text style={styles.callOutTextStyle}>{marker.placeName}</Text>
            </View>
          </Callout>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapViewStyle: {
    flex: 1,
    height: 300,
    width: 360
  },
  callOutStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff'
  },
  callOutTextStyle: {
    fontSize: 16,
    marginBottom: 5
  }
});

export default Map;