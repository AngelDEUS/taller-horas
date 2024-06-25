import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CustomTabBarIcon = ({ label, icon, isFocused, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.tab}>

        <View style={styles.contenOp}>
            <Ionicons name={icon} size={24} color={isFocused ? '#007bff' : 'gray'} />
            {isFocused && <Text style={styles.tabText}>{label}</Text>}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    contenOp: {
        backgroundColor: "#007bff",
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        padding: 2,
        borderRadius: 50,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        paddingVertical: 10,
    },
    tabText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
    },
});

export default CustomTabBarIcon;
