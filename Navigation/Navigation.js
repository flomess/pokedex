import Home from '../Pages/Home';
import PokemonDetails from '../Pages/PokemonDetails';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PokemonStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                title:'Accueil',
                headerStyle:{
                    backgroundColor: 'red',
                    width: '100%',
                    textAlign: 'center'
                },
            }}/>
            <Stack.Screen name="Details" component={PokemonDetails} />
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="suce" component={PokemonStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}