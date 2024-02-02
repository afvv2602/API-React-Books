import * as React from 'react';
import * as RN from 'react-native';
// Importa useRoute además de useNavigation
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Update() {
    const navigation = useNavigation();
    const route = useRoute(); 

    const { bookId, name, price } = route.params;

    const [newItem, setNewItem] = React.useState({
        name: name,
        price: price,
    });

    const onSend = async () => {
        try {
            const response = await fetch(`http://192.168.1.186:8080/api/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newItem.name,
                    price: newItem.price,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update the book');
            }
            RN.Alert.alert('Success', 'Book updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            RN.Alert.alert('Error', 'Failed to update the book');
        }
    };

    return (
        <RN.View style={styles.container}>
            <RN.Text style={styles.tittle}>Update book</RN.Text>
            <RN.TextInput
                value={newItem.name} 
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                placeholder='Book name'
                style={styles.inputContainer}
            />
            <RN.TextInput
                value={newItem.price.toString()}
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

