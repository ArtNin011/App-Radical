import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [cep, setCep] = useState({});
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [inputCep, setInputCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  useEffect(() => {
    if (inputCep.length === 8) {
      BuscaCep(inputCep);
    }
  }, [inputCep]);

  const BuscaCep = async (argCep) => {
    if (argCep.length !== 8) return;
    setLoading(true);
    setShowInfo(false);
    const url = `https://viacep.com.br/ws/${argCep}/json/`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.erro) {
        alert('CEP não encontrado');
        setLoading(false);
        return;
      }
      setCep(data);
      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setSelectedEstado(data.uf || '');

      setTimeout(() => {
        setLoading(false);
        setShowInfo(true);
      }, 800);
    } catch (error) {
      console.log("Erro: " + error);
      setLoading(false);
    }
  };

  const handleCepChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 8);
    setInputCep(cleaned);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Digite seu CEP</Text>
      <TextInput
        placeholder="Digite aqui"
        placeholderTextColor="white"
        value={inputCep}
        onChangeText={handleCepChange}
        keyboardType="numeric"
        maxLength={8}
        style={styles.input}
      />
      <StatusBar style="auto" />
      {loading && <ActivityIndicator size="large" color="blue" />}

      {!loading && showInfo && logradouro && (
        <>
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Endereço: </Text>
            <TextInput
              style={[styles.texto, styles.inputField]}
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>

          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Bairro: </Text>
            <TextInput
              style={[styles.texto, styles.inputField]}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Cidade: </Text>
            <TextInput
              style={[styles.texto, styles.inputField]}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Estado: </Text>
            <Picker
              selectedValue={selectedEstado}
              onValueChange={(itemValue) => setSelectedEstado(itemValue)}
              style={styles.picker}
            >
              {estados.map((estado) => (
                <Picker.Item key={estado} label={estado} value={estado} />
              ))}
            </Picker>
          </View>

          {cep.complemento && (
            <Text style={styles.texto}>Complemento: {cep.complemento}</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arthurNinja3000:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  }
  ,
  texto:{
    color: 'white'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  picker: {
    height: 50,
    width: 100,
    color: 'black',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputField: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
  },
});
