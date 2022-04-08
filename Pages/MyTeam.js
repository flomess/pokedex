import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import PokeCard from '../Components/PokeCard';
import StorageService from '../Utils/StorageService';
import {getPokemons} from '../Api/PokeApi';
export default function MyTeam(props){

    const { navigation,  ...restProps } = props

    const [listPokemon, setListPokemon] = StorageService.retrieveData('myTeam');

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
            <View style={styles.list}>
                {
                    listPokemon.length > 0 ?
                        <FlatList
                            horizontal={false}
                            numColumns={2}
                            data={listPokemon}
                            key={(item,index)=>index.toString()}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.name}
                        />
                        :
                        <Text>Aucun Pokémon dans la Team</Text>

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