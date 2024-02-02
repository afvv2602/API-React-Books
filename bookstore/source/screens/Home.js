import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import Book_card from '../components/Book_card';

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=> <RN.Button title='Add' onPress={() => navigation.navigate('Add')}></RN.Button>
        })
    },[])

    const loadBooks = async () => {
        try {
            const response = await fetch('http://192.168.1.186:8080/api/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            RN.Alert.alert('Error', 'Cannot fetch the books.');
        } finally {
            setLoading(false);
        }
    };

    const removeBookFromState = () => {
        loadBooks();
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadBooks();
        });

        return unsubscribe; 
    }, [navigation, isFocused]);
 
    return (
        <RN.View>
            {books.map(book => <Book_card key={book.id} {...book} onDelete={removeBookFromState}></Book_card>)}
        </RN.View>
    )
}