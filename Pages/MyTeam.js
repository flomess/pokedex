import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {eraseData, retrieveData} from '../Utils/StorageService';
import {getPokemons} from '../Api/PokeApi';
export default function MyTeam(props){

    const { navigation,  ...restProps } = props
    const [listPokemon, setListPokemon] = useState([])

    useEffect(()=>{
        props.navigation.addListener('focus', () => {
            retrieveData('myTeam').then(data => {
                if(data){
                    setListPokemon(JSON.parse(data))
                }
            })
        })
    },[])

    const releasePokemon = ()=>{
        setListPokemon([])
        eraseData('myTeam')
    }

    // erase one pokemon from the list
    const removePokemon = (pokemon)=>{
        let newList = listPokemon.filter(p => p.id !== pokemon.id)
        setListPokemon(newList)
        eraseData('myTeam').then(()=>{
            retrieveData('myTeam').then(data => {
                if(data){
                    setListPokemon(JSON.parse(data))
                }
            })
        })
    }


    const renderItem = ({ item}) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Details', {
                    pokemonDatas: item,
                })}>
                    <Image style={styles.imgCard} source={{uri:item.sprites.front_default}} />
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button title="Relâcher" onPress={()=>removePokemon(item)}/>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                listPokemon.length > 0 ?
            <View style={styles.list}>

                <FlatList
                    horizontal={false}
                    numColumns={2}
                    data={listPokemon}
                    key={(item,index)=>index.toString()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
                <TouchableOpacity style={styles.relacher} onPress={()=>{releasePokemon()}}>
                    <Text>
                    Relâcher tout le monde
                    </Text>
                </TouchableOpacity>
            </View>
                    :
                    <View style={styles.nope}>
                    <Text>¯\_(ツ)_/¯</Text>
                    </View>
            }
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
        width: 100,
        height: 100,
    },
    card: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    relacher: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f00',
        borderRadius: 5,
        padding: 5
    },
    nope: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});