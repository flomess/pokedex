import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {getPokemons} from '../Api/PokeApi';
export default function Home(props){

    const { navigation,  ...restProps } = props

    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [listPokemon, setListPokemon] = useState([])

    useEffect(() => {
        loadPokemon(nextPage)
    }, [])

    const loadPokemon = (url) => {
        getPokemons(url).then(datas => {
            setListPokemon([...listPokemon, ...datas.results])
            setNextPage(datas.next)
        })
    }

    const renderItem = ({ item}) => {
        return (
            <PokeCard url={item.url} name={item.name} navigation={navigation}></PokeCard>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                listPokemon?
                    <FlatList
                        horizontal={false}
                        numColumns={2}
                        data={listPokemon}
                        key={(item,index)=>index.toString()}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        onEndReached={() =>{
                            loadPokemon(nextPage)
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
    imgCard: {
        width: 66,
        height: 58,
    },
    card: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});