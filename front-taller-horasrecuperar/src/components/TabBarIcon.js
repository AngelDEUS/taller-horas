import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const TabBarIcon = ({ focused, name }) => {
  return <Ionicons name={name} size={30} color={focused ? 'blue' : 'gray'} />;
};

export default TabBarIcon;
