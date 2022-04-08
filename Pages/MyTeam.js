import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import PokeCard from '../Components/PokeCard';
import {getPokemons} from '../Api/PokeApi';
import StorageService from '../Utils/StorageService'
export default function MyTeam(props){


    return (
        <SafeAreaView style={styles.container}>
            suce
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