import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Alert, ScrollView, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Header, Text, Button, Input } from 'react-native-elements';

import { firebase } from './Firebase';

function SavePlace ({navigation, route}) {
 
  let currentTime = new Date();
  const time = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}`;
  
  const [selectedBerry, setSelectedBerry] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [litres, setLitres] = useState('');
  const [date, setDate] = useState(time);
  const [memo, setMemo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [otherSelection, setOtherSelection] = useState('Other');

  const {position} = route.params;
 
  const savePlace = () => {
    setPlaceName('');
    setLitres('');
    setMemo(''); 
   
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
  }

  const handlePickerValueChange = (value, index) => {
    if (index === 7) {
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
          onValueChange={handlePickerValueChange}>
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
    height: 250, 
    width: 300, 
    backgroundColor: "#fff", 
    borderRadius: 7, 
  }
});

export default SavePlace;

  