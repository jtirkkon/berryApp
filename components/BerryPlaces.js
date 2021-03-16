import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header, Text, ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';

//lyhyt painallus -> näyttää kartalla, pitkä painallus -> näyttää tarkemmat tiedot
//<ListItem bottomDivider onPress={() => navigation.navigate('Map', {addressToShow: item})}  onLongPress={() => deleteAddress(index)}></ListItem>
//<ion-icon name="locate-outline"></ion-icon>
//onLongPress={() => deleteAddress(index)}
/*useEffect(() =>{
  // Do something here
  }, [count]);*/

//ToDo: onnistuuko mappaus alkuperäisestä taulukosta? siis kun lähetetään monta paikkaa

function BerryPlaces ({navigation}) {
  const [placeList, setPlaceList] = useState([
  {berry: 'Blueberry', placeName: 'Koilismaa', litres: '8', position: {latitude: 65.21501231101409, longitude: 26.29520234366442}, time: '26.7.2020', memo: 'Hyvä mustikkapaikka lähellä tietä. Kuinka näkyy pitkä memo, vieläkin jatkuu ja vielä', isSelected: false}, 
  {berry: 'Lingonberry', placeName: 'Savo', litres: '15', position: {latitude: 62.97748114412601, longitude: 28.55870413715181}, time: '26.7.2020', memo: 'Hyvä puolukkapaikka.', isSelected: false},
  {berry: 'Blueberry', placeName: 'Melaniemi', litres: '10', position: {latitude: 63.08142706042671, longitude: 21.68541496994636}, time: '1.8.2020', memo: 'Mustikkamaa.', isSelected: false}
]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [locationIcon, setLocationIcon] = useState('black');
  //State tänne, johon talletetaan useat paikat.

  useEffect(() =>{
    // Do something here
    }, [placeList]);

  /*const newList = list.map((item) => {
    if (item.id === id) {
      const updatedItem = {
        ...item,
        isComplete: !item.isComplete,
      };

      return updatedItem;
    }

    return item;
  });

  setList(newList);*/



const showData = (item) => {
  console.log("item", item.placeName);
  setOverlayVisible(!overlayVisible);
  setOverlayText({berry: item.berry, placeName: item.placeName, litres: item.litres, time: item.time, memo: item.memo});
}

const deleteItem = () => {
  console.log("del");
}



const selectBerryPlace = (index) => {
  //setSelectedPlaces(placeList.filter((item, i) => i === index));
  
  let tempArr = placeList;
  
  tempArr[index].isSelected = !tempArr[index].isSelected;
  //tempArr[index].testi = 'OK';
  //const doubled = numbers.map((number) => number * 2);
  setPlaceList(tempArr);
  setSelectedPlaces(placeList.filter((item) => item.isSelected === true));
  
  //Näillä kahdella renderöinnillä toimii, tutkitaan vielä pakkorenderöintiä
  //Näyttäis toimivan välitys, sitten tietojen näyttö, kokeillaan vielä jotain kuvaketta
  setLocationIcon('green');
  setLocationIcon('black');
  //setLocationIcon('red');
  //tempArr = [];
  //Tämä tulostus? Vaihtaa nyt truet.
  console.log("placeList", placeList);
  
}

//Kokeillaan tuota taustaväriä
  //nämä oli #E0FFFF   87CEFA #00BFFF
  //() => showData(item)    
  //<Icon type="material" color='green' name="info" onPress={() => showData(index)}/>
  //<Icon type="material" color="red" name="delete" onPress={() => deleteProduct(index)}/>
  //navigation.navigate('Map', {placePosition: item.position, berry: item.berry, placeName: item.placeName, time: item.time, placePermission: true})
  //navigation.navigate('Map', {placePosition: item.position, berry: item.berry, placeName: item.placeName, time: item.time, placePermission: true})}
  //onLongPress={() => selectBerryPlace(index)} >


  //Jotain hämminkiä on kun välittää vain yhden komponentin!!!!! taulukko?
   
  renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => 
    navigation.navigate('Map', {selectedBerryPlaces: placeList, placePermission: true})}
    onLongPress={() => selectBerryPlace(index)} >
      <ListItem.Content>
        <ListItem.Title >{item.berry}, {item.placeName}</ListItem.Title>
        <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.litres} litres</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <Icon reverse name='information-outline' type='ionicon' color={item.isSelected ? '#008000' : '#BDB76B'} onPress={() => showData(item)}/>
      </ListItem.Content>
      <ListItem.Content>
        <Icon reverse name='trash-bin-outline' type='ionicon' color='red' onPress={() => deleteItem(index)}/>
      </ListItem.Content>
      
    </ListItem>
  );

  //erillinen lista joka välit <ion-icon name="information-outline"></ion-icon>
  
  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Map')}>Map</Text>}
        centerComponent={<Text h4 onPress = {() => 
        navigation.navigate('Map', {selectedBerryPlaces: placeList.filter((item) => item.isSelected === true), placePermission: true})}>Show selected</Text>}
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
  },
  infoIconStyle: {
    width: 40,
    height: 40  
  }
});



export default BerryPlaces;