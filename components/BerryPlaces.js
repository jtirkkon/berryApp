import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Header, Text, ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { firebase } from './Firebase';
import { LogBox } from 'react-native';


function BerryPlaces ({navigation}) {
  LogBox.ignoreLogs(['Setting a timer']);
  const [placeList, setPlaceList] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState({});
  //Tarviiko tätä?const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [temp, setTemp] = useState('black');

  /*const firebaseConfig = {
    apiKey: "AIzaSyDBF6hUqAFBWAGHqJABwnj8uu7K-iUykD8",
    authDomain: "berryapp-e2c7e.firebaseapp.com",
    databaseURL: "https://berryapp-e2c7e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "berryapp-e2c7e",
    storageBucket: "berryapp-e2c7e.appspot.com",
    messagingSenderId: "3982672749",
    appId: "1:3982672749:web:74a9232db469ea2ab61064",
    measurementId: "G-HW99C0YXLW"
  };

  //firebase.app();
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("berryplaces initiliaze");
   } else {
    firebase.app(); // if already initialized, use that one
    console.log("berryplace app()");
  }*/

  useEffect(() => {
    //setPlaceList([]);
    getData();
  }, []);

  
  const getData = () => {
    firebase.database().ref('data/').on('value', snapshot => {
      const data = snapshot.val();
      console.log("in getData", data);
      const tempArray = Object.entries(data);
      const dataArray = [];
      //console.log(Object.entries(data));
      for (let i = 0; i < tempArray.length; i++) {
        dataArray.push({berry: tempArray[i][1].berry,  placeName: tempArray[i][1].placeName, litres: tempArray[i][1].litres,  
        position: tempArray[i][1].position, time: tempArray[i][1].time, memo: tempArray[i][1].memo,  isSelected: false,  id: tempArray[i][0]});
      }
      
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
            //let productRef = firebase.database().ref('data/' + id);
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
    
    //Tätä tutkittava?
    setTemp('green');
    setTemp('black');
  }

  const showSelected = () => {
    console.log("show selected");
    const placeSelected = placeList.find(item => item.isSelected === true);
    if (placeSelected) {
      navigation.navigate('Map', {selectedBerryPlaces: placeList.filter((item) => item.isSelected === true), placePermission: true});
    } else {
      Alert.alert(
        'Select at least one place.',
        '',
        [
          { 
            text: "OK", onPress: () => {} 
          }
        ]
      );
    }
    //, {selectedBerryPlaces: placeList.filter((item) => item.isSelected === true), placePermission: true})
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
        centerComponent={<Text h4 onPress = {showSelected}>Show selected</Text>}
        rightComponent = {<Text h4 onPress = {() => navigation.navigate('Help')}>Help</Text>}
      />
      
      <StatusBar style="auto" />
      <FlatList 
        data={placeList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={renderItem} 
      />

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