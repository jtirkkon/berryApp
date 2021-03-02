import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header, Text, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';

//lyhyt painallus -> näyttää kartalla, pitkä painallus -> näyttää tarkemmat tiedot
//<ListItem bottomDivider onPress={() => navigation.navigate('Map', {addressToShow: item})}  onLongPress={() => deleteAddress(index)}></ListItem>
//<ion-icon name="locate-outline"></ion-icon>

function BerryPlaces ({navigation}) {
  const [placeList, setPlaceList] = useState([
  {berry: 'Blueberry', placeName: 'Koilismaa', litres: '8', position: {latitude: 64, longitude: 27}, time: '26.7.2020 13.50', memo: 'Hyvä mustikkapaikka lähellä tietä.'}, 
  {berry: 'Lingonberry', placeName: 'Savo', litres: '15', position: {latitude: 65.3, longitude: 27.7}, time: '26.7.2020 13.50', memo: 'Hyvä puolukkapaikka.'}]);

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('Map', {placePosition: item.position, placePermission: true})}>
      <ListItem.Content >
        <ListItem.Title>{item.berry}</ListItem.Title>
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
});



export default BerryPlaces;