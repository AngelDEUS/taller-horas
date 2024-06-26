import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { GET_INFORME_ENTRADAS, GET_INFORME_SALIDAS } from '../services/Informes_api';

export default function Reports() {
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);
  const [showEntradas, setShowEntradas] = useState(false);
  const [showSalidas, setShowSalidas] = useState(false);

  const fetchEntradas = async () => {
    const data = await GET_INFORME_ENTRADAS();
    setEntradas(data);
    setShowEntradas(true);
    setShowSalidas(false);
  };

  const fetchSalidas = async () => {
    const data = await GET_INFORME_SALIDAS();
    setSalidas(data);
    setShowSalidas(true);
    setShowEntradas(false);
  };

  const renderEntradas = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.Fecha_Hora_Entrada}</Text>
        <Text style={styles.tableCell}>{item.id_producto}</Text>
        <Text style={styles.tableCell}>{item.nombre_producto}</Text>
        <Text style={styles.tableCell}>{item.Cantidad}</Text>
      </View>
    );
  };

  const renderSalidas = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.Fecha_Hora_Salida}</Text>
        <Text style={styles.tableCell}>{item.id_producto}</Text>
        <Text style={styles.tableCell}>{item.nombre_producto}</Text>
        <Text style={styles.tableCell}>{item.cantidad_salida}</Text>
        <Text style={styles.tableCell}>{item.descripcion}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonTop} onPress={fetchEntradas}>
            <Text style={styles.textButtonTop}>Informe Entradas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTop} onPress={fetchSalidas}>
            <Text style={styles.textButtonTop}>Informe Salidas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerMain}>
          <View style={styles.containerMainRedux}>
            <Text style={styles.title}>
              {showEntradas ? 'Informe de Entradas' : showSalidas ? 'Informe de Salidas' : 'Seleccione un Informe'}
            </Text>
            {showEntradas && (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Fecha y Hora</Text>
                  <Text style={styles.tableHeader}>ID Producto</Text>
                  <Text style={styles.tableHeader}>Nombre Producto</Text>
                  <Text style={styles.tableHeader}>Cantidad</Text>
                </View>
                <FlatList
                  data={entradas}
                  renderItem={renderEntradas}
                  keyExtractor={(item) => `entradas-${item.id_producto}-${item.Fecha_Hora_Entrada}`}
                  style={styles.table}
                />
              </>
            )}
            {showSalidas && (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Fecha y Hora</Text>
                  <Text style={styles.tableHeader}>ID Producto</Text>
                  <Text style={styles.tableHeader}>Nombre Producto</Text>
                  <Text style={styles.tableHeader}>Cantidad Salida</Text>
                  <Text style={styles.tableHeader}>Descripción</Text>
                </View>
                <FlatList
                  data={salidas}
                  renderItem={renderSalidas}
                  keyExtractor={(item) => `salidas-${item.id_salida}-${item.Fecha_Hora_Salida}`}
                  style={styles.table}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerMain: {
    flex: 1,
    padding: 20,
  },
  containerMainRedux: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10,
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  buttonsContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonTop: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
  },
  textButtonTop: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#fff",
  },
  title: {
    color: "#303235",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    margin: 20,
  },
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
