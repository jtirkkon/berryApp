import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Map from './components/Map';
import SavePlace from './components/SavePlace';
import BerryPlaces from './components/BerryPlaces';
//import MyPlaces from './components/MyPlaces'
//Todo:
//Ekana: Näyttäminen kartalla, kun klikkaa vain yhtä
//Vaihdetaanko kysymysmerkki isompaan?
//Memo jää piiloon
//Kysyttävä other-valintaa.
//Ei näytä vielä tietoja.
//2. Tietokanta kuntoon
//3. Voi valita useita kohteita, jotka näytetään kartalla, tämä

const Stack = createStackNavigator();

//tallennus ja Kaikki tallennetut paikat, komponentit

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Save new place" component={SavePlace} />
        <Stack.Screen name="Berry places" component={BerryPlaces} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
