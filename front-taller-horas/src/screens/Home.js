import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GET_PRODUCTOS_REGISTRADOS, GET_STOCKS_EXISTENTES, GET_PRODUCTOS_STOCK_BAJO, GET_PRODUCTOS_SIN_STOCK } from '../services/dasboard_api';
import { getDashboardMayorStock } from '../services/api';

export default function Home() {
  const [productosRegistrados, setProductosRegistrados] = useState(0);
  const [productosSinStock, setProductosSinStock] = useState(0);
  const [productosPocoStock, setProductosPocoStock] = useState(0);
  const [productosMayorStock, setProductosMayorStock] = useState([]);
  const [totalStocksExistentes, setTotalStocksExistentes] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {

        const stocksExistentesResponse = await GET_STOCKS_EXISTENTES();
        setTotalStocksExistentes(stocksExistentesResponse?.Stocks_Existentes || 0);

        const registradosResponse = await GET_PRODUCTOS_REGISTRADOS();
        setProductosRegistrados(registradosResponse?.Productos_Registrados || 0);

        const sinStockResponse = await GET_PRODUCTOS_SIN_STOCK();
        setProductosSinStock(sinStockResponse?.Productos_Sin_Stock || 0);

        const pocoStockResponse = await GET_PRODUCTOS_STOCK_BAJO();
        setProductosPocoStock(pocoStockResponse?.Productos_Stock_Bajo || 0);

        const mayorStockResponse = await getDashboardMayorStock();
        setProductosMayorStock(mayorStockResponse || []);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mainSubContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Stock Existente total </Text>
            <Text style={styles.cardCount}>{totalStocksExistentes}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Productos Existentes</Text>
            <Text style={styles.cardCount}>{productosRegistrados}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Productos Sin Stock</Text>
            <Text style={styles.cardCount}>{productosSinStock}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Productos Poco Stock</Text>
            <Text style={styles.cardCount}>{productosPocoStock}</Text>
          </View>

          <View style={styles.stockContainer}>
            <ScrollView>
              <Text style={styles.stockTitle}>Productos con Mayor Stock</Text>
              {productosMayorStock.map((producto, index) => (
                <View style={styles.stockItem} key={index}>
                  <Text style={styles.stockIndex}>{index + 1}</Text>
                  <View style={styles.grupItem}>
                    <Text style={styles.stockName}>{producto.nombre_producto}</Text>
                    <Text style={styles.stockDetails}>Stock - {producto.Stock_Existente}</Text>
                    <Text style={styles.stockDetails}>Tipo: {producto.tipo_producto} - Peso: {producto.peso_neto}{producto.detalle_peso_neto}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  mainSubContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
    padding: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
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
    flex: 1,
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
    borderRadius: 100,
    backgroundColor: '#007bff',
    marginRight: 20,
    lineHeight: 45,
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
