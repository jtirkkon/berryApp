import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Text } from 'react-native-elements';
import{ Icon } from'react-native-elements';

function Help() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <Text h3>Map</Text>
        </View>
        <View style={{margin: 20}}>
          <Text style={styles.textStyle}>When you click the <Text style={{fontWeight: 'bold'}}>Save</Text>, 
          the coordinates are saved based on your location.</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 20, marginRight: 100, alignItems: 'center'}}>
          <Icon reverse name='pointer' type='evilicon' color='grey'/>
          <Text style={styles.textStyle}>Press this if you want select a location on the map. The icon color turns green, when this feature is enabled. 
            When you click on the map, the coordinates are selected from the location you clicked.
        </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon reverse name='locate-outline' type='ionicon' color='#0000FF'/>
          <Text style={styles.textStyle}>Press to find your own location.</Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>
          <Text h3>BerryPlaces</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <Icon reverse name='information-outline' type='ionicon' color='#BDB76B'/>
          <Text style={styles.textStyle}>Press to see information from the place.</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon reverse name='trash-bin-outline' type='ionicon' color='red'/>
          <Text style={styles.textStyle}>Delete place.</Text>
        </View>
        <Text style={{fontSize: 16, margin: 20}}><Text style={{fontWeight: 'bold'}}>Press</Text> the place item to see it on the map.</Text>
        <Text style={{fontSize: 16, marginRight: 20, marginLeft: 20, marginBottom: 20}}>You can select several places to 
        <Text style={{fontWeight: 'bold'}}> long press</Text> the item. The color of information icon turns green. To see selected places, press
        <Text style={{fontWeight: 'bold'}}> Show selected.</Text> The map navigates to location of first item.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'flex-start',
    //justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
  }
});

  export default Help;