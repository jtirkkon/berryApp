import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Header, Text, Button, Input } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

import { Icon } from'react-native-elements';

//Tähän vielä paikannimi
//Tietokanta
//Ikkuna, jos valitsee muun

function SavePlace ({navigation, route}) {
  const {position} = route.params;
  console.log(position);
  
  let currentTime = new Date();
  const time = `${currentTime.getDate()}.${currentTime.getMonth() + 1}.${currentTime.getFullYear()}, ${currentTime.getHours()}:${currentTime.getMinutes()}`;
  console.log(time);
  

  const [selectedBerry, setSelectedBerry] = useState('Blueberry');
  const [placeName, setPlacename] = useState('');
  const [litres, setLitres] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists berryTest (id integer primary key not null, selectedBerry text, place text, litres real, latitude text, longitude text, time text, memo text);');
    });
    updateList();    
  }, []);

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
       
      <Input label = 'Place name' onChangeText={text => setPlaceName(text)} value={placeName}/>
      <Input label = 'Litres' keyboardType = 'number-pad' onChangeText={text => setLitres(text)} value={litres}/>
      <Input label = 'Memo' multiline onChangeText={text => setMemo(text)} value={memo}/>
      <Button icon={{name: 'save'}} title='SAVE' buttonStyle={{width: 250, alignSelf: 'center' }}></Button>
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