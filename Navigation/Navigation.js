import Home from '../Pages/Home';
import PokemonDetails from '../Pages/PokemonDetails';
import React from 'react';
import MyTeam from '../Pages/MyTeam';
import { Ionicons } from '@expo/vector-icons';
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
                title:'Pokédex',
                headerTitleAlign: 'center',
            }}/>
            <Stack.Screen name="Details" component={PokemonDetails} />
        </Stack.Navigator>
    )
}

function MyTeamStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyTeam" component={MyTeam} options={{
                title:'My Team',
                headerTitleAlign: 'center',
            }}/>
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accueil" component={PokemonStack} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({}) => {return <Ionicons name={'home'} size={24} color={'black'} />;
                },}}/>
                <Tab.Screen name="MyTeam" component={MyTeamStack} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({}) => {return <Ionicons name={'ios-people'} size={24} color={'black'} />;
                },}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}