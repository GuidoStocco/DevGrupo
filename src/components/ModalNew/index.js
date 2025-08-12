import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";



export default function ModalNew({ setVisible }) {

    const user = auth().currentUser.toJSON();

    const [room, setRoom] = useState('');

    function handleRoom(){
        if(room === ''){
            alert('Digite o nome da sala');
            return;
        }
        createRoom();
    }

    function createRoom() {
        firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name: room,
            owner: user.uid,
            lastMessage:{
                text: `Bem-vindo(a) ao grupo ${room}`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        })
        .then((docRef) => { 
            docRef.collection('MESSAGES').add({
                text: `Bem-vindo(a) ao grupo ${room}`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                system: true,
            })
            .then(() => {
                setVisible();
            })  
        })
        .catch((err) => {
            console.error("Error creating room: ", err);
            alert('Erro ao criar sala, tente novamente mais tarde.');
        })
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={styles.modal}></View>
            </TouchableWithoutFeedback>


            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo Grupo?</Text>
                <TextInput
                    value={room}
                    onChangeText={text => setRoom(text)}
                    placeholder="Nome para sua sala"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.btnCreate} onPress={handleRoom}>
                    <Text style={styles.btnText}>Criar sala</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.btnCreate, { backgroundColor: '#bdbdbd', marginTop: 10 }]} onPress={setVisible}>
                    <Text style={styles.btnText}>Voltar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(34,34,34, 0.4)',
        flex: 1,
    },
    modal: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 15,
    },
    title:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: '#121212',
        marginTop: 14,
    },
    input:{
        borderRadius: 4,
        height: 45,
        backgroundColor: '#ddd',
        marginVertical: 15,
        paddingHorizontal: 5,
        fontSize: 16,
    },
    btnCreate:{
        backgroundColor: '#2e54d4',
        height: 45,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})