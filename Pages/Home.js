import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
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

    const [search, setSearch] = useState('')
    const [searchListPokemon, setSearchListPokemon] = useState([])

    useEffect(() => {
        if(search.length > 0){
            const newListPokemon = listPokemon.filter(pokemon => {
                return pokemon.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchListPokemon(newListPokemon)
        }else{
            setSearchListPokemon([])
        }
    }, [search])

    const renderItem = ({ item}) => {
        return (
            <PokeCard style={styles.container} url={item.url} name={item.name} navigation={navigation}></PokeCard>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pokedex</Text>
            </View>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un Pokémon"
                    onChangeText={text => setSearch(text)}
                    value={search}
                />
            </View>
            <View style={styles.list}>
                {
                    search.length > 0 ?
                        <FlatList
                            horizontal={false}
                            numColumns={2}
                            data={search.length > 0 ? searchListPokemon : listPokemon}
                            key={(item,index)=>index.toString()}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.name}
                            onEndReached={() => loadPokemon(nextPage)}
                            onEndReachedThreshold={0.5}
                        />
                    :
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

                }
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    imgCard: {
        width: 66,
        height: 58,
    },
    card: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        marginTop: 25
    }
});