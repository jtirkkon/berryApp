import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert, ScrollView, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Header, Text, Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';

import { Icon } from'react-native-elements';

//Nyt oma tietokanta testataan sen toiminta. Ensin tallennus
//Tietokantaan tallennus:
//Unmounted component: tulee vain silloin tällöin. Suosikeissa on yksi sivu tallennettuna. Tuleeko, jos esim. litres on tyhjä?
//Settin timer?

//1. Tietokannasta pitäisi nyt koittaa lukea tiedot!
//Ikkuna, jos valitsee muun, tämä seuraavaksi. Jatketaan tätä kuntoon! Ei kunnolla toimi.

function SavePlace ({navigation, route}) {
  const [selectedBerry, setSelectedBerry] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [litres, setLitres] = useState('');
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
  console.log("in save place", position);
  //Pitäiskö position tallettaa stateen?
  //Vai tuleeko memoryleak siitä, jos ei valitse mitään marjaa?
  
  let currentTime = new Date();
  const time = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}`;
  console.log(time);
  
  const savePlace = () => {
    //console.log("testFB");
    firebase.database().ref('data/').push(
        {'berry': selectedBerry, 'placeName': placeName, 'litres': litres, 'position': position, 'time': time, 'memo': memo}
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
  }

  const handlePickerValueChange = (value, index) => {
    console.log("handle", value);
    console.log("index", index);
    if (index === 7) {
      console.log("other");
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

  /*<Picker
          selectedValue={selectedBerry}
          style={{ height: 50, width: 250, marginTop: 20, marginBottom: 20 }}
          onValueChange={(itemValue, itemIndex) => setSelectedBerry(itemValue)}
        ></Picker>*/

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
    //justifyContent: 'center',
    //alignItems: 'center', 
    //paddingTop: 30
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


/*Modal esimerkki inputilla
import { StatusBar } from "expo-status-bar"; 
import React, { useState } from "react"; 
import { Button, SafeAreaView, StyleSheet, Modal,  
         View, TextInput, Dimensions } from "react-native"; 
  
const { width } = Dimensions.get("window"); 
  
export default function App() { 
    
    // This is to manage Modal State 
    const [isModalVisible, setModalVisible] = useState(false); 
  
    // This is to manage TextInput State 
    const [inputValue, setInputValue] = useState(""); 
  
    // Create toggleModalVisibility function that will 
    // Open and close modal upon button clicks. 
    const toggleModalVisibility = () => { 
        setModalVisible(!isModalVisible); 
    }; 
  
    return ( 
        <SafeAreaView style={styles.screen}> 
            <StatusBar style="auto" /> 
  
            {/**  We are going to create a Modal with Text Input. } 
            <Button title="Show Modal" onPress={toggleModalVisibility} /> 
  
            {/** This is our modal component containing textinput and a button } 
            /*<Modal animationType="slide" 
                   transparent visible={isModalVisible}  
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}> 
                <View style={styles.viewWrapper}> 
                    <View style={styles.modalView}> 
                        <TextInput placeholder="Enter something..." 
                                   value={inputValue} style={styles.textInput}  
                                   onChangeText={(value) => setInputValue(value)} /> 
  
                        {This button is responsible to close the modal } 
                        <Button title="Close" onPress={toggleModalVisibility} /> 
                    </View> 
                </View> 
            </Modal> 
        </SafeAreaView> 
    ); 
} */
  
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
