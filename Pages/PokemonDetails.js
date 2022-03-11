import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {getPokemons} from '../Api/PokeApi';

export default function PokemonDetails(props){
    const { navigation, route,  ...restProps } = props

    return (
        <View style={styles.container}>
            <Image style={styles.imgCard} source={{uri:route.params.pokemonDatas.sprites.front_default}} />
            <Text>#{route.params.pokemonDatas.order} {route.params.pokemonDatas.name}</Text>
            <Text>{route.params.pokemonDatas.types[0].type.name}</Text>
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
    }
});