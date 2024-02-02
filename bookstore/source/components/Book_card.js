import * as React from 'react';
import * as RN from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Book_card({
    id,
    name,
    price,
    onDelete
}) {
    const navigation = useNavigation();

    const onDeleteBook = async () => {
        try {
            console.log(`Attempting to delete book with ID: ${id}`);
            const response = await fetch(`http://192.168.1.186:8080/api/books/${id}`, {
                method: 'DELETE',
            });
            const data = await response.text();
            if (!response.ok) {
                throw new Error(`Error deleting book: ${data}`);
            }
            RN.Alert.alert('Success', 'Book deleted successfully', [
                { text: 'OK', onPress: onDelete }
            ]);
        } catch (error) {
            console.error("Error deleting book: ", error);
            RN.Alert.alert('Error', `Could not delete the book: ${error.message}`);
        }
    }
    
    return(
        <RN.View style={styles.productContainer}>
            <RN.View style={{flex: 1}}>
                <RN.Text style={styles.name}>{name}</RN.Text>
                <RN.Text style={styles.price}>${price}</RN.Text>
            </RN.View>
            <AntDesign onPress={() => onDeleteBook(id)} name='delete' size={24} style={styles.Icon} />
            <AntDesign onPress={() => navigation.navigate('Update', { bookId: id, name: name, price: price })} name='edit' size={24} style={styles.Icon} />
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
    },
    Icon: {
        margin: 5,
    },
    button:{
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    }
})