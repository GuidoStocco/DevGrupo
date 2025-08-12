import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';

export default function ModalNew({ setVisible }) {

    const [room, setRoom] = useState('');

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

                <TouchableOpacity style={styles.btnCreate}>
                    <Text style={styles.btnText}>Criar sala</Text>
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