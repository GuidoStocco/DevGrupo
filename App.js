import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Routes/>
      <StatusBar barStyle='dark-content' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
