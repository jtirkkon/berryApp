import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header, Text, ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';

//lyhyt painallus -> näyttää kartalla, pitkä painallus -> näyttää tarkemmat tiedot
//<ListItem bottomDivider onPress={() => navigation.navigate('Map', {addressToShow: item})}  onLongPress={() => deleteAddress(index)}></ListItem>
//<ion-icon name="locate-outline"></ion-icon>
//onLongPress={() => deleteAddress(index)}

function BerryPlaces ({navigation}) {
  const [placeList, setPlaceList] = useState([
  {berry: 'Blueberry', placeName: 'Koilismaa', litres: '8', position: {latitude: 65.21501231101409, longitude: 26.29520234366442}, time: '26.7.2020', memo: 'Hyvä mustikkapaikka lähellä tietä. Kuinka näkyy pitkä memo, vieläkin jatkuu ja vielä'}, 
  {berry: 'Lingonberry', placeName: 'Savo', litres: '15', position: {latitude: 62.97748114412601, longitude: 28.55870413715181}, time: '26.7.2020', memo: 'Hyvä puolukkapaikka.'},
  {berry: 'Blueberry', placeName: 'Melaniemi', litres: '10', position: {latitude: 63.08142706042671, longitude: 21.68541496994636}, time: '1.8.2020', memo: 'Mustikkamaa.'}
]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState({});

const showData = (item) => {
  console.log("item", item.placeName);
  setOverlayVisible(!overlayVisible);
  setOverlayText({berry: item.berry, placeName: item.placeName, litres: item.litres, time: item.time, memo: item.memo});
  //Alert ikkunaan tiedot? Overlay -> kokeillaan tätä
}

   
  renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => 
    navigation.navigate('Map', {placePosition: item.position, berry: item.berry, placeName: item.placeName, time: item.time, placePermission: true})}
    onLongPress={() => showData(item)}>
      <ListItem.Content >
        <ListItem.Title>{item.berry}, {item.placeName}</ListItem.Title>
        <ListItem.Subtitle>{item.litres} litres</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <Icon type="material" color="red" name="delete" onPress={() => deleteProduct(index)}/>
      </ListItem.Content>
    </ListItem>
  );
  
  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Map')}>Map</Text>}
        centerComponent={<Text h4 onPress = {() => navigation.navigate('Save new place')}>Show places</Text>}
        rightComponent = {{icon:'help', color:'#fff'}}
      />
      <FlatList 
        data={placeList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={renderItem} 
      />
      
      
      
       
       <StatusBar style="auto" />

       <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
        <View >
          <Text style={styles.overlayTextStyle}>{overlayText.berry}, {overlayText.litres} litres</Text>
          <Text style={styles.overlayTextStyle}>{overlayText.placeName}, {overlayText.time}</Text>
          <Text style={styles.overlayMemoStyle}>{overlayText.memo}</Text>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    //alignItems: 'center', 
    //paddingTop: 30
  },
  overlayTextStyle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  overlayMemoStyle: {
    fontSize: 18
  }
});



export default BerryPlaces;