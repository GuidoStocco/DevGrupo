import React, {useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


export default function SignIn() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const [type, setType] = useState(false); 

  function handleLogin() {

    if(type === true){
      if(name === '' || email === '' || password === '') return;

      auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name
        }).then(() => {
          navigation.goBack();
        })
      })
      .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
          return;
        }
        if(error.code === 'auth/invalid-email'){
          return;
        }
      })
      console.log("Cadastrando usuário:", {name, email, password});
    } else{

      console.log("Acessando conta:", {email, password});
      //acessar conta
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>HeyGrupos</Text>
      <Text style={styles.textLogo}>Ajude, colabore e faça networking</Text>

      <View style={styles.form}>
        {type && <TextInput placeholder='Nome' style={styles.input} value={name}
          onChangeText={(text) => setName(text)}
        />}

        <TextInput placeholder='Email' style={styles.input}
          value={email} onChangeText={(text) => setEmail(text)}
        />
        <TextInput placeholder='Senha' style={styles.input}
          value={password} onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} keyboardType='numeric'
        />

        <TouchableOpacity style={[styles.btn, {backgroundColor: type ? '#34A853' : '#121212'}]} 
          onPress={handleLogin}
        >
          <Text style={styles.textBtn}>{type ? "Cadastrar" : "Acessar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2} onPress={() => setType(!type)}>
          <Text style={styles.textNew}>{type ? "Acessar sua conta" : "Criar uma nova conta"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 80,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  textLogo: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  form:{
    marginTop: 30,
    width: '90%',
  },
  input:{
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  btn:{
    backgroundColor: '#121212',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textNew:{
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
  },
  btn2:{
    marginTop: 10,
  },
  textNew:{
    color: '#000',
    textAlign: 'center',
  }
});
