import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Header, Text, ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { firebase } from './Firebase';

function BerryPlaces ({navigation}) {
  
  const [placeList, setPlaceList] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState({});
  const [temp, setTemp] = useState('');

  useEffect(() => {
    getData();
    
    return () => {
      firebase.database().ref('data/').off('value');
    };
  }, []);

  const getData = () => {
    let dataArray = [];
    
    firebase.database().ref('data/').on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        let tempArray = Object.entries(data);
        for (let i = 0; i < tempArray.length; i++) {
          dataArray.push({berry: tempArray[i][1].berry,  placeName: tempArray[i][1].placeName, litres: tempArray[i][1].litres,  
          position: tempArray[i][1].position, time: tempArray[i][1].time, memo: tempArray[i][1].memo,  isSelected: false,  id: tempArray[i][0]});
        }
          setPlaceList(dataArray);
        } else {
          setPlaceList([]);
        }
    });
  }

  const showData = (item) => {
    setOverlayVisible(!overlayVisible);
    setOverlayText({berry: item.berry, placeName: item.placeName, litres: item.litres, time: item.time, memo: item.memo});
  }

  const deleteItem = (placeName, id) => {
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
            getData();
          } 
        }
      ]
    );
  }

  const selectBerryPlace = (index) => {
    let tempArr = placeList;
    tempArr[index].isSelected = !tempArr[index].isSelected;
    setPlaceList(tempArr);
    
    //Iconin väri ei päivity ilman näitä?
    setTemp('temp');
    setTemp('');
  }

  const showSelected = () => {
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
  }

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