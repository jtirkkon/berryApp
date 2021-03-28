import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './components/Map';
import SavePlace from './components/SavePlace';
import BerryPlaces from './components/BerryPlaces';
import Help from './components/Help';
//import MyPlaces from './components/MyPlaces'
//Bugit:  - Markkerin päivitys
//Position homma on tehtävä ekana... Ehkä tämä vois nyt toimia, kartta tietysta tarkentaa aina sijaintia, jos se on laajemmalla.
//Tein oman staten vielä käyttäjän sijainnille.
//Päivittyykö oma sijainti, onko oltava joku timeri
// - Setting timer
// - React state update
//Todo: - Aika inputti vielä saveen, johon defaulttina nykyinen aika.
//Nauhoitus kännykästä
//emulaattirin kokeilu

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Save new place" component={SavePlace} />
        <Stack.Screen name="Berry places" component={BerryPlaces} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
