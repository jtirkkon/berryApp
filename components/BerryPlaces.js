import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Header, Text, ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';


function BerryPlaces ({navigation}) {
  const [placeList, setPlaceList] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState({});
  //Tarviiko tätä?const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [temp, setTemp] = useState('black');
  
  const firebaseConfig = {
    apiKey: "AIzaSyDBF6hUqAFBWAGHqJABwnj8uu7K-iUykD8",
    authDomain: "berryapp-e2c7e.firebaseapp.com",
    databaseURL: "https://berryapp-e2c7e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "berryapp-e2c7e",
    storageBucket: "berryapp-e2c7e.appspot.com",
    messagingSenderId: "3982672749",
    appId: "1:3982672749:web:74a9232db469ea2ab61064",
    measurementId: "G-HW99C0YXLW"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
   } else {
    firebase.app(); // if already initialized, use that one
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firebase.database().ref('data/').on('value', snapshot => {
      const data = snapshot.val();
      //console.log(data);
      const tempArray = Object.entries(data);
      const dataArray = [];
      //console.log(Object.entries(data));
      for (let i = 0; i < tempArray.length; i++) {
        dataArray.push({berry: tempArray[i][1].berry,  placeName: tempArray[i][1].placeName, litres: tempArray[i][1].litres,  
        position: tempArray[i][1].position, time: tempArray[i][1].time, memo: tempArray[i][1].memo,  isSelected: false,  id: tempArray[i][0]});
      }
      //console.log("dataArray:", dataArray);
      setPlaceList(dataArray);
    });  
  }

  const showData = (item) => {
    //console.log("showData", item.placeName);
    setOverlayVisible(!overlayVisible);
    setOverlayText({berry: item.berry, placeName: item.placeName, litres: item.litres, time: item.time, memo: item.memo});
  }

  const deleteItem = (placeName, id) => {
    //console.log("deleteItem", id);
    Alert.alert(
      `Delete ${placeName}?`,
      '',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "OK", onPress: () => {
            let productRef = firebase.database().ref('data/' + id);
            productRef.remove();
          } 
        }
      ]
    );
    getData();
  }

  const selectBerryPlace = (index) => {
    let tempArr = placeList;
    tempArr[index].isSelected = !tempArr[index].isSelected;
    setPlaceList(tempArr);
    //setSelectedPlaces(placeList.filter((item) => item.isSelected === true));
    //Näillä kahdella renderöinnillä toimii, tutkitaan vielä pakkorenderöintiä
    
    //Tätä tutkittava
    setTemp('green');
    setTemp('black');
  }

  //containerStyle={{width: 400}} Tällä sais leveämmäksi
  renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => 
    navigation.navigate('Map', {selectedBerryPlaces: [item], placePermission: true})}
    onLongPress={() => selectBerryPlace(index)} containerStyle={{alignContent: 'space-between'}}>
      <ListItem.Content style={{minWidth: 50}}>
        <ListItem.Title>{item.berry}</ListItem.Title>
        <ListItem.Title>{item.placeName}</ListItem.Title>
        <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.litres} litres</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <Icon reverse name='information-outline' type='ionicon' color={item.isSelected ? '#008000' : '#BDB76B'} onPress={() => showData(item)}/>
      </ListItem.Content>
      <ListItem.Content>
        <Icon reverse name='trash-bin-outline' type='ionicon' color='red' onPress={() => deleteItem(item.placeName, item.id)}/>
      </ListItem.Content>
      
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Map')}>Map</Text>}
        centerComponent={<Text h4 onPress = {() => 
        navigation.navigate('Map', {selectedBerryPlaces: placeList.filter((item) => item.isSelected === true), placePermission: true})}>Show selected</Text>}
        rightComponent = {<Text h4 onPress = {() => navigation.navigate('Help')}>Help</Text>}
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