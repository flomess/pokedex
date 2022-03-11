import { View, StyleSheet, Image, Text, Button } from 'react-native';
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
                    <Image style={styles.imgCard} source={{uri:pokemonDatas.sprites.front_default}} />
                    <Text>{name}</Text>
                    <Button title="Details" onPress={() => navigation.navigate('Details', {
                        pokemonDatas: pokemonDatas,
                    })} />
                </View>
                :
                <View>
                    <Text>Loading...</Text>
                </View>
    )

}

const styles = StyleSheet.create({
    imgCard: {
        width: 66,
        height: 58,
    },
    card: {
        margin: 20,
        padding: 5,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    }
});