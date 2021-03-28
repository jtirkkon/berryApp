import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import MapView, { Marker} from'react-native-maps';
import * as Location from 'expo-location';
import { Header } from 'react-native-elements';
import { Text } from 'react-native-elements';
import{ Icon } from'react-native-elements';

//Bugit: Markkerin tiedot ei päivity, ennenkuin sitä klikkaa uudestaan.

function Map ({navigation, route}) {
  const [position, setPosition] = useState({latitude: 60.17, longitude: 24.94});
  //const [currentMapPosition, setCurrentMapPosition] = useState({latitude: 60.17, longitude: 24.94});
  const [positionMarker, setPositionMarker] = useState({latitude: 100, longitude: 200});
  const [placeMarkers, setPlaceMarkers] = useState([{position: {latitude: 100, longitude: 200}, berry: '', placeName: ''}]);
  const [coordinatesFromMap, setCoordinatesFromMap] = useState(false);
  const [userPosition, setUserPosition] = useState({latitude: 100, longitude: 200})

  //Tässä bugi, menee välillä näihin koordinaatteihin
  currentMapPosition = {latitude: 61.17, longitude: 24.94};
  
  
  
  if (route.params) {
    //console.log("params in map", route.params);
    if (route.params.placePermission) {
      setPlaceMarkers(route.params.selectedBerryPlaces);
      //console.log("placeMarkers", placeMarkers);
      const placePosition = route.params.selectedBerryPlaces[0].position;
      setPosition({latitude: placePosition.latitude, longitude: placePosition.longitude});
      route.params.placePermission = false;
    }
  }
  
  useEffect(() => {
    //console.log("useEffect");
    //coordinatesFromMap = false;
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
    if (coordinatesFromMap === false) {
      //console.log("if");
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

  //Function is executed if user select coordinates by clicking on the map
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
        />
        
        {placeMarkers.map((marker, index) => (
          <Marker
          key={index}
          coordinate={{
            latitude: marker.position.latitude,
            longitude: marker.position.longitude
          }}
          title={marker.berry}
          description={`${marker.placeName}, ${marker.time}`}
          />
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
});

export default Map;