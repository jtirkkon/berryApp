import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Header, Text, Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
//import * as SQLite from 'expo-sqlite';

import { Icon } from'react-native-elements';

//Nyt oma tietokanta testataan sen toiminta. Ensin tallennus
//Tietokantaan tallennus:

//1. Tietokannasta pitäisi nyt koittaa lukea tiedot!
//Ikkuna, jos valitsee muun
//Keyboard aware scrollview, memo jää keypadin alle
//Keyboard avoidin view
//Kokeillaan tätä esimerkkiä toisessa koodissa
//https://docs.expo.io/versions/latest/react-native/keyboardavoidingview/

function SavePlace ({navigation, route}) {
  const [selectedBerry, setSelectedBerry] = useState('Blueberry');
  const [placeName, setPlaceName] = useState('');
  const [litres, setLitres] = useState('');
  const [memo, setMemo] = useState('');

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  /*const firebaseConfig = {
    apiKey: "AIzaSyCscPrioYRsFHTx6MIXjbuMaf0ngxgpUQg",
    authDomain: "shoppinglist-12009.firebaseapp.com",
    databaseURL: "https://shoppinglist-12009-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-12009",
    storageBucket: "shoppinglist-12009.appspot.com",
    messagingSenderId: "246131758389",
    appId: "1:246131758389:web:22fbe828207e1a299ca87c",
    measurementId: "G-0R5CT305MN"
  };*/

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
   } else {
    firebase.app(); // if already initialized, use that one
  }
  
  const {position} = route.params;
  console.log(position);
  
  let currentTime = new Date();
  const time = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}`;
  console.log(time);
  

  

  
  const savePlace = () => {
    console.log("testFB");
    firebase.database().ref('data/').push(
        {'berry': selectedBerry, 'placeName': placeName, 'litres': litres, 'position': position, 'time': time, 'memo': memo}
      );
      
  }
  
  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Map')}>Map</Text>}
        centerComponent={<Text h4 onPress = {() => navigation.navigate('Berry places')}>Show places</Text>}
        rightComponent = {{icon:'help', color:'#fff'}}
      />
      
      <Picker
        selectedValue={selectedBerry}
        style={{ height: 50, width: 250, marginTop: 20, marginBottom: 20 }}
        onValueChange={(itemValue, itemIndex) => setSelectedBerry(itemValue)}
      >
        <Picker.Item label="Select berry" value="" />
        <Picker.Item label="Blueberry (mustikka)" value="blueberry" />
        <Picker.Item label="Lingonberry (puolukka)" value="lingonberry" />
        <Picker.Item label="Cloudberry (lakka)" value="cloudberry" />
        <Picker.Item label="Raspberry (vadelma)" value="raspberry" />
        <Picker.Item label="Cranberry (karpalo)" value="cranberry" />
        <Picker.Item label="Sea-buckthorn (tyrni)" value="sea-buckthorn" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <KeyboardAvoidingView
  
      behavior="positon"
      enabled>
       
      <Input label = 'Place name' onChangeText={text => setPlaceName(text)} value={placeName}/>
      <Input label = 'Litres' keyboardType = 'number-pad' onChangeText={text => setLitres(text)} value={litres}/>
      
      <Input label = 'Memo' multiline onChangeText={text => setMemo(text)} value={memo}/>
      
      <Button icon={{name: 'save'}} title='SAVE' buttonStyle={{width: 250, alignSelf: 'center' }} onPress={savePlace}></Button>
      </KeyboardAvoidingView> 
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

/*container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'flex-start', 
  paddingTop: 30
},*/

export default SavePlace;

//Sqlite
/*useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists berryTest (id integer primary key not null, selectedBerry text, place text, litres real, latitude text, longitude text, time text, memo text);');
    });
    updateList();    
  }, []);*/

  /*const savePlace = () => {
    db.transaction(tx => {
        tx.executeSql('insert into berryTest (berry, place, litres, position, time, memo) values (?, ?, ?, ?, ?, ? ?, ?);', [selectedBerry, placeName, litres, latitude, longitude, time, memo]);    
      }, null, updateList
    );
    setPlaceName('');
    setLitres('');
    setMemo('');
  }*/
  //onValueChange={(itemValue, itemIndex) => setSelectedBerry(itemValue)}

  /*handlePickerChange = (itemValue, itemIndex) => {
    if (itemValue != '') {
    setSelectedBerry(itemValue);
    }
  }*/