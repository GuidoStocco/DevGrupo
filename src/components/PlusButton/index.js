import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PlusButton({ setVisible, userStatus }) {

    const navigation = useNavigation();

    function handleModal() {
        userStatus ? setVisible() : navigation.navigate("SignIn");
    }

    return (
        <TouchableOpacity style={styles.containerBtn} activeOpacity={0.9}
            onPress={handleModal}
        >
            <View>
                <Text style={styles.text}>+</Text>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    containerBtn:{
        backgroundColor: '#2e54d4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: "5%",
        right: "6%"
    },
    text: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    }
})