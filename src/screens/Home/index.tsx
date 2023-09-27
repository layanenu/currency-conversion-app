import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

export default function index() {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [total, setTotal] = useState(0);

  async function fetchCurrency() {
    try {
      const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${currencySymbol}`);
      setTotal((Number(response.data[`${currencySymbol.toUpperCase()}BRL`].ask) * Number(currencyValue)))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text>Conversor de Moeda</Text>

      <TextInput
        style={styles.currencyInput}
        placeholder='Insira o valor a ser convertido'
        placeholderTextColor='grey'
        keyboardType="numeric"
        value={currencyValue}
        onChangeText={(text) => setCurrencyValue(text)}
      ></TextInput>

      <TextInput
        style={styles.currencyInput}
        placeholder='Insira o símbolo da moeda'
        placeholderTextColor='grey'
        value={currencySymbol.toUpperCase()}
        onChangeText={(text) => setCurrencySymbol(text)}
      ></TextInput>

      <TouchableOpacity
        onPress={fetchCurrency}
      >
        <Text>Converter</Text>
      </TouchableOpacity>

      <Text>{total.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center'
  },
  currencyInput: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  }
})