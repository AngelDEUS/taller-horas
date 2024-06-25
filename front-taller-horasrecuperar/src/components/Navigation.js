import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Inventario from '../screens/Inventario';
import AddScreen from '../screens/Anadir';
import Reportes from '../screens/Reportes';
import CustomTabBarIcon from './CustomTabBarIcon';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Inventario') {
            iconName = 'book';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
          } else if (route.name === 'Reportes') {
            iconName = 'clipboard';
          }

          return <CustomTabBarIcon label={route.name} icon={iconName} isFocused={focused} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} 
    style={styles.mainContenOps}/>
      <Tab.Screen name="Inventario" component={Inventario} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Reportes" component={Reportes} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  mainContenOps: {
      backgroundColor: "#007bff",
  }
});

export default Navigation;
