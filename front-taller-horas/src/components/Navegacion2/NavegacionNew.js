import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens 
import HomeScreen from '../../screens/Home';
import Inventario from '../../screens/Inventario';
import AddScreen from '../../screens/Anadir';
import Reportes from '../../screens/Reportes';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Inicio'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Inicio') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Inventario') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Add') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'Reportes') {
                        iconName = focused ? 'clipboard' : 'clipboard-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }, // Ajuste para centrar el texto
                tabBarStyle: { backgroundColor: '#fff', height: 80, borderTopWidth: 0, borderColor: '#fff'},
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name='Inicio' component={HomeScreen} options={{ tabBarLabel: 'Inicio', headerShown: false }} />
            <Tab.Screen name='Inventario' component={Inventario} options={{ tabBarLabel: 'Inventario', headerShown: false }} />
            <Tab.Screen name='Add' component={AddScreen} options={{ tabBarLabel: 'Agregar', headerShown: false }} />
            <Tab.Screen name='Reportes' component={Reportes} options={{ tabBarLabel: 'Reportes', headerShown: false }} />
        </Tab.Navigator>
    );
}

export default function NavigationNew() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
