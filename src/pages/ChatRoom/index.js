import React from 'react';
import {Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ChatRoom() {
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>Tela ChatRoom</Text>
      <Button title='login' onPress={() => navigation.navigate('SignIn')}/>
    </View>
  );
}

