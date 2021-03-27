import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import MapView, { Marker} from'react-native-maps';
import * as Location from 'expo-location';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Text } from 'react-native-elements';
import{ Icon } from'react-native-elements';

//Bugit: Markkerin tiedot ei päivity, ennenkuin sitä klikkaa uudestaan.

/*<View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
    />
    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '50%', //for center align
            alignSelf: 'flex-end' //for align to right
        }}
    >
        <Button />
    </View>
</View>*/

/*<MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.currentLatitude,
            longitude: this.state.currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: this.state.currentLatitude,
            longitude: this.state.currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
          onPress={(event) => this.handlePress(event)}></MapView>*/

/*const NavigateToSavePlace = ({navigation}) => {
  return (
    <Icon type="material" name="save" onPress = {() => navigation.navigate('SaveNewPlace')}/>
  )
}*/

//leftComponent = {<Icon type="material" name="save" text="Save" onPress = {() => navigation.navigate('Save new place')}/>}


function Map ({navigation, route}) {
  const [position, setPosition] = useState({latitude: 60.17, longitude: 24.94});
  //const [currentMapPosition, setCurrentMapPosition] = useState({latitude: 60.17, longitude: 24.94});
  const [positionMarker, setPositionMarker] = useState({latitude: 0, longitude: 0});
  //const [placeMarker, setPlaceMarker] = useState({latitude: 100, longitude: 200, berry: '', placeName: '', time: ''});
  //placeMarkers nimen vaihto
  const [placeMarkers, setPlaceMarkers] = useState([{position: {latitude: 100, longitude: 200}, berry: '', placeName: ''}]);
  const [coordinatesFromMap, setCoordinatesFromMap] = useState(false);

  currentMapPosition = {latitude: 60.17, longitude: 24.94};
  
  
  //let coordinatesFromMap;
  //let coordinateIconColor = 'grey';
  

  /*{latitude: 63.08550590078892, longitude: 21.66948688445667, berry: 'blueberry', placeName: 'ström', time: '2.7.2020'},
  {latitude: 63.08300590078892, longitude: 21.69348688445667, berry: 'lingonberry', placeName: 'ström2', time: '5.7.2018'},
  {latitude: 63.07300590078892, longitude: 21.69548688445667, berry: 'lingonberry', placeName: 'ström3', time: '5.7.2016'},]);*/
  
  
  
  //Joku eri ehto, kun tulee useita markkereita
  if (route.params) {
    console.log("params in map", route.params);
    if (route.params.placePermission) {
      //Testimarkkereihin tiedot
      setPlaceMarkers(route.params.selectedBerryPlaces);
      console.log("placeMarkers", placeMarkers);
      const placePosition = route.params.selectedBerryPlaces[0].position;
      /*const berry = route.params.berry;
      const placeName = route.params.placeName;
      const time = route.params.time;*/
      //console.log(placePosition);
      //console.log("if", route.params.placePosition.latitude);
      //setPlacePosition({latitude: route.params.placePosition.latitude, longitude: route.params.placePosition.longitude});
      
      setPosition({latitude: placePosition.latitude, longitude: placePosition.longitude});
      /*setPlaceMarker({latitude: placePosition.latitude, longitude: placePosition.longitude, berry: berry, placeName: placeName, time: time});*/
      route.params.placePermission = false;
    }
    
  }
  
  useEffect(() => {
    console.log("useEffect");
    //coordinatesFromMap = false;
    //coordinateIconColor = 'grey';
    getLocation();
  }, []);
  
  const getLocation = async() => {
    //Checkpermission
    let { status} = await Location.requestPermissionsAsync();
    if(status !== 'granted') {
      Alert.alert('No permission to accesslocation');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setPosition({latitude: location.coords.latitude, longitude: location.coords.longitude});
      setPositionMarker({latitude: location.coords.latitude, longitude: location.coords.longitude});
    }
  }

  //tällä päivitetään nykyinen sijainti
  const updateMapPosition = (region) => {
    currentMapPosition = {latitude: region.latitude, longitude: region.longitude};
  }
  
  const handleCoordinatesSelection = () => {
    
    if (coordinatesFromMap === false) {
      console.log("if");
      setPosition(currentMapPosition);
      setCoordinatesFromMap(true);
      console.log("iffin sisällä", coordinatesFromMap);
      //coordinateIconColor = 'green';
      //setCoordinateIconColor('green');
      Alert.alert(
        'You can select a location by clicking on the map.',
        '',
        [
          { 
            text: "OK", onPress: () => {} 
          }
        ]
      );
      //setCoordinateIconColor('green');    
    } else {
      setCoordinatesFromMap(false);
      setPosition(currentMapPosition);
      //setCoordinateIconColor('grey');
    }
    //coordinatesFromMap = !coordinatesFromMap;
    console.log("handleCoordinatesSelection", coordinatesFromMap);
  }

  const selectOwnLocation = () => {
    getLocation();
    //ei ehdi mukaan
    console.log("mikä on position", position);
    navigation.navigate('Save new place', {position: position});
  }

  const selectPlaceFromMap = (event) => {
    console.log(event.nativeEvent.coordinate);
    console.log("ennen iffiä", coordinatesFromMap);
    if (coordinatesFromMap) {
      console.log(event.nativeEvent.coordinate);
      navigation.navigate('Save new place', {position: event.nativeEvent.coordinate});
    }
  }

  
  
  //navigation.navigate('History', {history: calculations}
  //onPress={(event) => this.handlePress(event)}>
  //tehdään täällä updatemappostion
  //hakee täällä uudestaan getposiotionin, jos valinta on päällä
  //leftComponent = {<Text h4 onPress = {() => navigation.navigate('Save new place', {position: position})}>Save</Text>}
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

/*
//fontawesomesta 
<Icon reverse name='pointer' type='evilicon' color='red' onPress={handleCoordinatesSelection}/>
<Marker
          coordinate={{
            latitude: placeMarker.latitude,
            longitude: placeMarker.longitude
          }}
          title={`${placeMarker.berry}`}
          description={`${placeMarker.placeName}, ${placeMarker.time}`}
        />

/*onPress={() =>
  Alert.alert(
    'paikan markkeri',
  )
}*/

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