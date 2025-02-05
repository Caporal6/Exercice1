import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Contacts from './composants/Contacts';
import AjouterContact from './composants/AjouterContact';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Accueil',
    screens: {
      Accueil: {
        screen: Contacts,
        options: {
          title: "Bienvenue"
        },
      },
      Ajouter: {
        screen: AjouterContact,
        options: {
          title: "Page ajouter"
        },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);



  return (
    <View style={styles.container}>
      <Navigation />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    backgroundColor: '#6a89a7',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
