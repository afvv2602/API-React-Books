import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Add() {
    const navigation = useNavigation();
    const [newItem, setNewItem] = React.useState({
        id: '',
        name: '',
        price: '',
    });
    const generateRandomId = () => {
        return Math.floor(Math.random() * 100000).toString();
    };

    const onSend = async () => {
        try {
            const response = await fetch('http://192.168.1.186:8080/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:generateRandomId(),
                    name: newItem.name,
                    price:newItem.price
                }),
            });
            navigation.goBack();
        } catch (error) {
            console.error(error);
            RN.Alert.alert('Error', 'Failed to add the book');
        }
    };

    return (
        <RN.View style={styles.container}>
            <RN.Text style={styles.tittle}>Add a new book</RN.Text>
            <RN.TextInput
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                placeholder='Book name'
                style={styles.inputContainer}
            />
            <RN.TextInput
                onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                placeholder='$ Price'
                style={styles.inputContainer}
                keyboardType='number-pad'
            />
            <RN.Button title='Publish' onPress={onSend} />
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    tittle: {
        fontSize: 32,
        fontWeight: '700',
    },
    inputContainer: {
        width:"90%",
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    }
})

