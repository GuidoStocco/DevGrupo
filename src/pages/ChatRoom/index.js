import React, {useState, useEffect} from 'react';
import {Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import auth from "@react-native-firebase/auth";
import PlusButton from '../../components/PlusButton';
import ModalNew from '../../components/ModalNew';
import firestore from "@react-native-firebase/firestore";

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log("User:", hasUser);
    setUser(hasUser);
  }, [isFocused])

  useEffect(() => {
    let isActive = true;

    function getChats(){
       firestore()
    .collection('MESSAGE_THREADS')
    .orderBy('lastMessage.createdAt', 'desc')
    .limit(10)
    .get()
    .then((snapshot) =>{
      const threads = snapshot.docs.map(doc => {
        return {
          _id: doc.id,
          name: '',
          lastMessage: { text: '' },
          ...doc.data()
        }
      })

      if(isActive){
        setThreads(threads);
        setLoading(false);
      }
    })
  }
  getChats();
    return () => { isActive = false; }

    
  }, [isFocused])

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => {
      setUser(null);
      navigation.navigate("SignIn")
    })
    .catch(() => {
      console.error("Sign out failed");
    })
  }

  if(loading){
    return(
    <ActivityIndicator size="large" color="#0000ff" />
  )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerArrow}>

          {user && (
              <TouchableOpacity onPress={handleSignOut}>
                  <Feather name="arrow-left" size={28} color="#fff"/>
              </TouchableOpacity>
          )}

          <Text style={styles.headerTitle}>Grupos</Text>
        </View>

        <TouchableOpacity style={styles.headerSearch}>
          <Feather name="search" size={28} color="#fff" />
        </TouchableOpacity>
        
      </View>
      
      <PlusButton setVisible={() => setModal(true)} userStatus={user}/>

      <Modal visible={modal} animationType="slide" transparent={true}>
        <ModalNew setVisible={() => setModal(false)}/>
      </Modal>  
    </SafeAreaView>
  );
}



const styles = {
  container: {
    flex: 1,
  },
  headerRoom:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: '#2e54d4',
    paddingHorizontal: 10,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  headerArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    marginLeft: 10,
  },
};