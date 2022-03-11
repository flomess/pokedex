import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {getPokemons} from '../Api/PokeApi';

export default function PokemonDetails(props){
    const { navigation, route,  ...restProps } = props
    const types = route.params.pokemonDatas.types
    return (
        <View style={styles.container}>
            <Image style={styles.imgCard} source={{uri:route.params.pokemonDatas.sprites.other['official-artwork'].front_default}} />
            <Text>#{route.params.pokemonDatas.id} {route.params.pokemonDatas.name}</Text>
            <Text style={{flexDirection:'row', flexWrap:'wrap'}}>
            {types.map(type => (
                <Text>{type.type.name}&nbsp;</Text>
            ))}
            </Text>
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