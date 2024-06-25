// src/screens/Home.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainSubContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productos Registrados</Text>
          <Text style={styles.cardCount}>180</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productos Sin Stock</Text>
          <Text style={styles.cardCount}>13</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productos Poco Stock</Text>
          <Text style={styles.cardCount}>10</Text>
        </View>
        <View style={styles.stockContainer}>
          <Text style={styles.stockTitle}>Productos Mayor Stock</Text>
          <View style={styles.stockItem}>
            <Text style={styles.stockIndex}>1</Text>
            <View style={styles.grupItem}>
              <Text style={styles.stockName}>Pollo Frito</Text>
              <Text style={styles.stockDetails}>Stock - 70</Text>
              <Text style={styles.stockDetails}>Tipo: Comestible - Peso: 1.80kg</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  mainSubContainer: {
    height: '100%',
    backgroundColor: '#dbdbdb',
    padding: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    paddingLeft: 40,
    borderRadius: 30,
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303235',
    textAlignVertical: 'center',
  },
  cardCount: {
    width: 80,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 20,
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#007bff',
  },
  stockContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  stockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#303235',
    textAlign: "center",
    marginBottom: 20,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stockIndex: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#007bff',
    marginRight: 20,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockDetails: {
    fontSize: 14,
    color: '#6c757d',
  },
});
