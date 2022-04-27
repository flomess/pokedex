import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {storeData, retrieveData, eraseData} from '../Utils/StorageService';
import {getPokemons} from '../Api/PokeApi';

export default function PokemonDetails(props){
    const { navigation, route,  ...restProps } = props
    const types = route.params.pokemonDatas.types
    const addPokemon = () => {
        retrieveData('myTeam').then((data) => {
            data = data?JSON.parse(data):[]
            const newTeam = data.concat([route.params.pokemonDatas])
            storeData('myTeam', JSON.stringify(newTeam))
        })
    }
    return (
        <View style={styles.container}>
            <Image style={styles.imgCard} source={{uri:route.params.pokemonDatas.sprites.other['official-artwork'].front_default}} />
            <Text>#{route.params.pokemonDatas.id} {route.params.pokemonDatas.name}</Text>
            <Text style={{flexDirection:'row', flexWrap:'wrap'}}>
            {types.map(type => (
                <Text>{type.type.name}&nbsp;</Text>
            ))}
            </Text>
            <TouchableOpacity onPress={()=>{addPokemon()}}>
                <Text>Ajouter à mon équipe</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgCard: {
        width: 200,
        height: 200,
    },
});