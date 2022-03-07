import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import CustomButton from './Components/CustomButton';
import {getPokemons} from './Api/PokeApi';

export default function App() {

    const [color, showColor] = useState();
    const [listPokemon, setListPokemon] = useState([...Array().keys()])

    let nextPage = null

    useEffect(() => {
        getPokemons().then(datas => {
            nextPage = datas.next
            setListPokemon(datas.results)
        })
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View styles={styles.card}>
                {/*<Image source={{url}}/>*/}
                <Text>{item.name}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                listPokemon?
                    <FlatList
                        data={listPokemon}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        onEndReached={() =>{
                                console.log('next')
                                getPokemons(nextPage).then(datas => {
                                    nextPage = datas.next
                                    setListPokemon(datas.results)
                                })
                        }}
                    />
                    :
                    <Text>Loading...</Text>
            }
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    card: {
      flex: 3
    }
});
