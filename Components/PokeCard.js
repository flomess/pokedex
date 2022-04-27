import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import {getPokemons} from '../Api/PokeApi';

export default function PokeCard(props){

    const { url, name, navigation,  ...restProps } = props

    const [pokemonDatas, setPokemonDatas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getPokemons(url).then(data => {
            setPokemonDatas(data)
            setIsLoading(false)
        })
    },[])

    return (
            !isLoading?
                <View style={styles.card}>
                    <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Details', {
                        pokemonDatas: pokemonDatas,
                    })}>
                        <Image style={styles.imgCard} source={{uri:pokemonDatas.sprites.front_default}} />
                        <Text>{pokemonDatas.name}</Text>
                    </TouchableOpacity>
                </View>
                :
                <View styles={styles.card}>
                    <Text>Loading...</Text>
                </View>
    )

}

const styles = StyleSheet.create({
    imgCard: {
        width: 100,
        height: 100,
    },
    card: {
        margin: 'auto',
        width: '50%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable: {
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    }
});