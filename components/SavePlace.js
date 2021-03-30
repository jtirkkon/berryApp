import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert, ScrollView, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Header, Text, Button, Input } from 'react-native-elements';
//Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android??? 
import { LogBox } from 'react-native';
import * as firebase from 'firebase';

import { Icon } from'react-native-elements';

//Unmounted component: tulee vain silloin tällöin. Suosikeissa on yksi sivu tallennettuna. Tuleeko, jos esim. litres on tyhjä?
//Setting timer?
//aika inputti tänne.

function SavePlace ({navigation, route}) {
  LogBox.ignoreLogs(['Setting a timer']);
  
  let currentTime = new Date();
  const time = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}`;
  
  const [selectedBerry, setSelectedBerry] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [litres, setLitres] = useState('');
  const [date, setDate] = useState(time);
  const [memo, setMemo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [otherSelection, setOtherSelection] = useState('Other');

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
  
  const {position} = route.params;
  console.log("in save place pos.", position);
  //Pitäiskö position tallettaa stateen?
  //Vai tuleeko memoryleak siitä, jos ei valitse mitään marjaa?
  
  
  //console.log(time);
  
  const savePlace = () => {
    firebase.database().ref('data/').push(
        {'berry': selectedBerry, 'placeName': placeName, 'litres': litres, 'position': position, 'time': date, 'memo': memo}
      );

    Alert.alert(
      'Data saved',
      '',
      [
        { 
          text: "OK", onPress: () => {} 
        }
      ]
    );
    setPlaceName('');
    setLitres('');
    setMemo('');    
  }

  const handlePickerValueChange = (value, index) => {
    //console.log("handle", value);
    //console.log("index", index);
    if (index === 7) {
      //console.log("other");
      setOtherSelection('');
      setModalVisible(true);
    } else {
      setOtherSelection('Other');
      setSelectedBerry(value);
    }
  }

  const handleOtherSelection = () => {
    setSelectedBerry(otherSelection);
    setModalVisible(false);
  }

  //Date inputti vielä
  return (
    <View style={styles.container}>
      <Header
        leftComponent = {<Text h4 onPress = {() => navigation.navigate('Map')}>Map</Text>}
        centerComponent={<Text h4 onPress = {() => navigation.navigate('Berry places')}>Show places</Text>}
        rightComponent = {<Text h4 onPress = {() => navigation.navigate('Help')}>Help</Text>}
      />
      
      <ScrollView>
        <Picker
          selectedValue={selectedBerry}
          style={{ height: 50, width: 250, marginTop: 20, marginBottom: 20 }}
          onValueChange={handlePickerValueChange}
        >
          <Picker.Item label="Select berry" value="" />
          <Picker.Item label="Blueberry (mustikka)" value="blueberry" />
          <Picker.Item label="Lingonberry (puolukka)" value="lingonberry" />
          <Picker.Item label="Cloudberry (lakka)" value="cloudberry" />
          <Picker.Item label="Raspberry (vadelma)" value="raspberry" />
          <Picker.Item label="Cranberry (karpalo)" value="cranberry" />
          <Picker.Item label="Sea-buckthorn (tyrni)" value="sea-buckthorn" />
          <Picker.Item label={otherSelection} value={otherSelection} />
        </Picker>
        
        <Input label = 'Place name' onChangeText={text => setPlaceName(text)} value={placeName}/>
        <Input label = 'Litres' keyboardType = 'number-pad' onChangeText={text => setLitres(text)} value={litres}/>
        <Input label = 'Date' onChangeText={text => setDate(text)} value={date}/>
        <Input label = 'Memo' multiline onChangeText={text => setMemo(text)} value={memo}/>
        <Button icon={{name: 'save'}} title='SAVE' buttonStyle={{width: 250, alignSelf: 'center' }} onPress={savePlace}></Button>
      </ScrollView>
        
        <Modal visible={isModalVisible}>
          <View style={styles.viewWrapper}>
            <View style={styles.modalStyle}>
              <Input label = 'Other berry etc.' onChangeText={text => setOtherSelection(text)} value={otherSelection}/>
              <View style={{flexDirection: 'row'}}>
                <Button icon={{name: 'cancel'}} title='CANCEL' buttonStyle={{width: 120, marginRight: 30}} 
                  onPress={() => {setModalVisible(false); setOtherSelection('Other')}}>
                </Button>
                <Button icon={{name: 'save'}} title='OK' buttonStyle={{width: 120}} 
                  onPress={handleOtherSelection}>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewWrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.2)", 
}, 
  modalStyle: {
    alignItems: "center", 
    justifyContent: "center", 
    //position: "absolute", 
    height: 250, 
    width: 300, 
    backgroundColor: "#fff", 
    borderRadius: 7, 
  }
});

/*container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'flex-start', 
  paddingTop: 30
},*/

export default SavePlace;

  
// These are user defined styles 
/*const styles = StyleSheet.create({ 
    screen: { 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#fff", 
    }, 
    viewWrapper: { 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "rgba(0, 0, 0, 0.2)", 
    }, 
    modalView: { 
        alignItems: "center", 
        justifyContent: "center", 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        elevation: 5, 
        transform: [{ translateX: -(width * 0.4) },  
                    { translateY: -90 }], 
        height: 180, 
        width: width * 0.8, 
        backgroundColor: "#fff", 
        borderRadius: 7, 
    }, 
    textInput: { 
        width: "80%", 
        borderRadius: 5, 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderColor: "rgba(0, 0, 0, 0.2)", 
        borderWidth: 1, 
        marginBottom: 8, 
    }, 
});*/

/*
 Can't perform a React state update on an unmounted component. 
 This is a no-op, but it indicates a memory leak in your application. 
 To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
 
 Tuli ainakin silloin, kun tulin takaisin show placesista ja tallensin, tuleekohan tämä vain yhden kerran. 
 Näin kävi myös toisen kerran.
 Kaikki valittu -> varoitus tuli
 - Ei valittu mitään -> varoitus tuli
 - Myös vaikka kävi välillä mapissa, niin varoitus tuli ainakin savea painamalla.
 - Tuli myös kartasta koordinaatit valitsemalla
 - Entä jos ei käy ollenkaan Berry placesissa? -> Silloin ei näyttäis tulevan
 - Berry Placesissa käyminen, sen jotenkin taitaa aiheuttaa...
 - Pitäis kokeilla saada firebase vain yhteen paikkaan -> tämä ekaksi!

 For me, clean the state in the unmount of the component helped.

 const [state, setState] = useState({});

useEffect(() => {
    myFunction();
    return () => {
      setState({}); // This worked for me
    };
}, []);

const myFunction = () => {
    setState({
        name: 'Jhon',
        surname: 'Doe',
    })




*/
