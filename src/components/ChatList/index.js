import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ChatList({data}) {
 return (
   <TouchableOpacity>
        <View style={styles.row}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text numberOfLines={1} style={styles.text}>{data.name}</Text>
                </View>

                <Text numberOfLines={1} style={styles.contentText}>{data.lastMessage.text}</Text>
            </View>
        </View>
   </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        backgroundColor: 'rgba(241, 240, 245, 0.5)'
    },
    content: {
        flexShrink: 1
    },
    header:{
        flexDirection: 'row',
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },

})