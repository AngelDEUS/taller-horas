import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { createProduct, createInventoryEntry, createProductEntry } from '../services/productServices_api';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [weight, setWeight] = useState('');
  const [weightDetail, setWeightDetail] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const navigation = useNavigation();
  const currentDateTime = new Date();
  const date = currentDateTime.toISOString().split('T')[0];
  const time = currentDateTime.toLocaleTimeString('en-US', { hour12: false });



  const generateProductId = (name) => {
    const letters = name.substring(0, 3).toUpperCase();
    const number = Math.floor(Math.random() * 900) + 100;
    return `${letters}-${number}`;
  };

  const handleRegisterProduct = async () => {
    const idProducto = generateProductId(productName);
    const product = {
      id_producto: idProducto,
      nombre_producto: productName,
      tipo_producto: productType,
      peso_neto: parseFloat(weight),
      detalle_peso_neto: weightDetail,
      precio: parseFloat(price),
      id_estado: 1
    };

    const inventoryEntry = {
      id_producto: idProducto,
      cantidad: parseInt(quantity, 10)
    };

    const productEntry = {
      id_producto: idProducto,
      cantidad_entrada: parseInt(quantity, 10),
      fecha: date,
      hora: time
    };
    console.log("------------------ Hora actual: ", productEntry);
    console.log("------------------:::::: fecha actual: ", date, " Hora actual", time);

    try {
      Alert.alert(
        "Confirmar Registro",
        "¿Deseas registrar el producto?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Aceptar",
            onPress: async () => {
              await createProduct(product);
              await createInventoryEntry(inventoryEntry);
              await createProductEntry(productEntry);
              Alert.alert("Registro Exitoso", "Producto registrado correctamente");
              // Limpia los inputs
              setProductName('');
              setProductType('');
              setWeight('');
              setWeightDetail('');
              setPrice('');
              setQuantity('');
              // Redirige a la pestaña de Inventario
              navigation.navigate('Inventario');
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      Alert.alert("Error", "No se pudo registrar el producto");
    }
  };

  return (
    <View style={stylesAgregar.container}>
      <View style={stylesAgregar.subContainer}>
        <View style={stylesTop.searchContainer}>
          <Text style={{ color: "white", marginLeft: 10, fontSize: 30, textAlign: "center" }}>Agregar</Text>
          <Text style={{ color: "#1ff7ff", marginLeft: 10, fontSize: 30, textAlign: "center" }}>Productos</Text>
          <Text style={{ color: "white", marginLeft: 10, fontSize: 30, textAlign: "center" }}>y su</Text>
          <Text style={{ color: "#1ff7ff", marginLeft: 10, fontSize: 30, textAlign: "center" }}>Stock</Text>
        </View>
        <View style={stylesAgregar.productFormContainer}>
          <View style={stylesAgregar.productForm}>
            <Text style={stylesAgregar.titleAgregar}>Agregar Producto o Entrada</Text>
            <Text
              style={stylesAgregar.inputFieldBlock}
              editable={false} selectTextOnFocus={false}
            >{generateProductId(productName)}</Text>
            <TextInput
              style={stylesAgregar.inputField}
              placeholder="Nombre Producto: ***"
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
            <View style={stylesAgregar.inputFieldPickerContainer}>
              <Picker
                selectedValue={productType}
                onValueChange={(itemValue) => setProductType(itemValue)}
              >
                <Picker.Item label="Seleccione Tipo de Producto" value="" />
                <Picker.Item label="Bebida" value="Bebida" />
                <Picker.Item label="Condimento" value="Condimento" />
                <Picker.Item label="Alimento" value="Alimento" />
                <Picker.Item label="Paquete" value="Paquete" />
                <Picker.Item label="Caja" value="Caja" />
                <Picker.Item label="Encurtido" value="Encurtido" />
              </Picker>
            </View>
            <View style={stylesAgregar.grupInuts}>
              <TextInput
                style={[stylesAgregar.inputField, { flex: 2 }]}
                placeholder="Peso Neto: "
                value={weight}
                onChangeText={(text) => setWeight(text)}
              />
              <View style={[stylesAgregar.inputFieldPickerContainer, { flex: 1 }]}>
                <Picker
                  selectedValue={weightDetail}
                  onValueChange={(itemValue) => setWeightDetail(itemValue)}
                >
                  <Picker.Item label="..." value="" />
                  <Picker.Item label="Gr" value="Gr" />
                  <Picker.Item label="Kg" value="Kg" />
                  <Picker.Item label="L" value="L" />
                </Picker>
              </View>
            </View>
            <TextInput
              style={stylesAgregar.inputField}
              placeholder="Precio del Producto: $ "
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <TextInput
              style={stylesAgregar.inputField}
              placeholder="Cantidad de entrada de Stock"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <TouchableOpacity style={stylesAgregar.buttonAgregar}
              onPress={handleRegisterProduct}>
              <Text style={stylesAgregar.buttonAgregarText}>Registrar Producto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesAgregar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: "hidden"
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  productFormContainer: {
    padding: 20,
    flex: 1,
  },
  productForm: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  inputFieldBlock: {
    color: "black",
    backgroundColor: '#e8eaf0',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  inputFieldPickerContainer: {
    marginBottom: 10,
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  grupInuts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonAgregar: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
  },
  buttonAgregarText: {
    color: "#fff",
    textAlign: "center",
    padding: 15,
  },
  titleAgregar: {
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
});

const stylesTop = StyleSheet.create({
  searchContainer: {
    height: 120,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#161b33',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: 'center'
  },
});

export default AddProductScreen;
