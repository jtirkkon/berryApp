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


//Katotaan myöhemmin, jos löydetään parempi ratkaisu
//Tällä kai pitäis saada enemmänkin markkereita.
/*{this.state.markers.map((marker, index) => (
  <Marker
  key={index}
  coordinate={marker.latlng}
  title={marker.title}
  description={marker.description}
/>
))}*/

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

//TODO: Nappi alareunaan, jolla saa oman sijainnin.
//Tehdään tallennus seuraavaksi!
/*<Icon
  reverse
  name='locate-outline'
  type='ionicon'
  color='#517fa4'
/>*/

/*const NavigateToSavePlace = ({navigation}) => {
  return (
    <Icon type="material" name="save" onPress = {() => navigation.navigate('SaveNewPlace')}/>
  )
}*/

//leftComponent = {<Icon type="material" name="save" text="Save" onPress = {() => navigation.navigate('Save new place')}/>}

//ei toimi navigation
//navigation.navigate('History', {history: calculations}
//Todo: tänne kartan siirtyminen, kun käyttäjä klikkaa itemiä
//TODO -> Githubiin
//
function Map ({navigation, route}) {
  const [position, setPosition] = useState({latitude: 60.17, longitude: 24.94});
  const [positionMarker, setPositionMarker] = useState({latitude: 0, longitude: 0});
  const [placeMarker, setPlaceMarker] = useState({latitude: 100, longitude: 200, berry: '', placeName: '', time: ''})
  
  
  
  if (route.params) {
    if (route.params.placePermission) {
      const placePosition = route.params.placePosition;
      const berry = route.params.berry;
      const placeName = route.params.placeName;
      const time = route.params.time;
      //console.log(placePosition);
      //console.log("if", route.params.placePosition.latitude);
      //setPlacePosition({latitude: route.params.placePosition.latitude, longitude: route.params.placePosition.longitude});
      setPosition({latitude: placePosition.latitude, longitude: placePosition.longitude});
      setPlaceMarker({latitude: placePosition.latitude, longitude: placePosition.longitude, berry: berry, placeName: placeName, time: time});
      route.params.placePermission = false;
    }
  }
  
  
  //console.log("map render");
  

  
  useEffect(() => {
    console.log("useEffect");
    
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
  
  //navigation.navigate('History', {history: calculations}
  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Save new place', {position: position})}>Save</Text>}
        centerComponent={<Text h4 onPress = {() => navigation.navigate('Berry places')}>Show places</Text>}
        rightComponent = {{icon:'help', color:'#fff'}}
        
      />
      <MapView
        mapType='hybrid'
        style={styles.mapViewStyle}
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
        <Marker
          coordinate={{
            latitude: placeMarker.latitude,
            longitude: placeMarker.longitude
          }}
          title={`${placeMarker.berry}`}
          description={`${placeMarker.placeName}, ${placeMarker.time}`}
          
        />    
      </MapView>
      <View style={{position: 'absolute', alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
        <Icon reverse name='locate-outline' type='ionicon' color='#0000FF' onPress={getLocation}/>
        <StatusBar style="auto" />
      </View>
    </View>
  );          
}

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