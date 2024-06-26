import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllStocks, getInventario, updateInventarioEntry } from '../services/inventario_api';
import { registerSalidaProducto } from '../services/movimientos_api.js';

const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [salidaDescripcion, setSalidaDescripcion] = useState('');
  const [cantidadSalida, setCantidadSalida] = useState(''); // Nuevo estado para la cantidad de salida

  useEffect(() => {
    fetchInventarioData();
  }, []);

  const fetchInventarioData = async () => {
    try {
      const data = await getInventario();
      setAllData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventario:', error);
      setError(new Error('Error al cargar el inventario. Inténtalo de nuevo más tarde.'));
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter(
        (item) =>
          item.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id_producto.includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  };

  const handleDecrement = (item) => {
    setSelectedProduct(item); // Seleccionar el producto para la salida
    setModalVisible(true); // Abrir el modal
  };

  const handleEdit = (id) => {
    console.log('Editar producto con id', id);
    // Lógica para editar el producto si es necesario
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null); // Limpiar el producto seleccionado
    setSalidaDescripcion(''); // Limpiar la descripción de salida
    setCantidadSalida(''); // Limpiar la cantidad de salida
  };

  const handleRegisterSalida = async () => {
    try {
      const { id_producto, Stock } = selectedProduct;
      const date = new Date();
      const formattedHora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const cantidad = parseInt(cantidadSalida); // Convertir la cantidad a entero
      if (cantidad <= 0 || cantidad > Stock) {
        Alert.alert('Cantidad inválida', 'La cantidad de salida debe ser mayor que cero y menor o igual al stock actual.');
        return;
      }
      const salidaData = {
        id_producto,
        cantidad_salida: cantidad,
        fecha: date.toISOString().split('T')[0],
        hora: formattedHora,
        descripcion: salidaDescripcion, // Descripción de la salida
      };
      await registerSalidaProducto(salidaData);
      fetchInventarioData();
      handleCloseModal();
      Alert.alert('Salida registrada', 'Se registró la salida del producto exitosamente.');
    } catch (error) {
      console.error('Error registering product salida:', error);
      Alert.alert('Error', 'Hubo un problema al registrar la salida del producto. Inténtalo de nuevo.');
    }
  };

  const renderProductItem = ({ item, index }) => (
    <View style={styles.productItem}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.id_producto} - {item.nombre_producto}</Text>
        <Text style={styles.productStock}>Stock - {item.Stock}</Text>
        <Text style={styles.productInfo}>Tipo: {item.tipo_producto} - Peso: {item.Peso_Producto}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.decrementButton} onPress={() => handleDecrement(item)}>
          <Ionicons name="remove-circle-outline" size={24} color="#ce7424" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id_producto)}>
          <Ionicons name="chevron-forward-outline" size={24} color="#757b81" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchSubContainer}>
            <Ionicons name="search-outline" size={24} color="gray" marginLeft={10} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Por ID o Nombre"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Buscar</Text>
              <Ionicons name="arrow-forward-outline" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.preContainerData}>
          <View style={styles.containerData}>
            <Text style={styles.titleCoom}>Inventario - Productos Encontrados</Text>
            {loading ? (
              <Text>Cargando datos...</Text>
            ) : error instanceof Error ? (
              <Text>{error.message}</Text>
            ) : (
              <FlatList
                data={filteredData}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id_producto}
              />
            )}
          </View>
        </View>
      </View>

      {/* Modal para la salida del producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Salida de Producto</Text>
            {selectedProduct && (
              <View style={styles.modalDetails}>
                <Text>ID Producto: {selectedProduct.id_producto}</Text>
                <Text>Nombre: {selectedProduct.nombre_producto}</Text>
                <Text>Stock Actual: {selectedProduct.Stock}</Text>
              </View>
            )}
            <TextInput
              style={styles.modalInput}
              placeholder="Cantidad a Salir"
              value={cantidadSalida}
              onChangeText={(text) => setCantidadSalida(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Descripción de la salida"
              value={salidaDescripcion}
              onChangeText={(text) => setSalidaDescripcion(text)}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleRegisterSalida}>
                <Text style={styles.modalButtonText}>Registrar Salida</Text>
              </TouchableOpacity>
              <Pressable style={styles.modalCloseButton} onPress={handleCloseModal}>
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  preContainerData: {
    flex: 1,
    padding: 20,
  },
  containerData: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  searchContainer: {
    height: 120,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  searchSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  titleCoom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#303235',
    textAlign: 'center',
    margin: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius:   10,
    marginHorizontal: 10,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
  },
  searchButtonText: {
    color: 'white',
    marginRight: 5,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  indexContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  indexText: {
    color: 'white',
    fontSize: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productStock: {
    color: 'gray',
  },
  productInfo: {
    color: 'blue',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: '#ffcda1',
    padding: 10,
    borderRadius: 18,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: '#d2d3d4',
    padding: 10,
    borderRadius: 18,
  },
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDetails: {
    marginBottom: 15,
  },
  modalInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default Inventario;

