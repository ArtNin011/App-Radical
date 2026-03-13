import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput } from 'react-native';

export default function App() {

  const [cep, setCep] = useState([]);

  const [loading, setLoading] = useState(false);

  const[inputCep, setInputCep] = useState('');

  const BuscaCep = async (argCep)=>{
    setLoading(true);
    const url = ` https://viacep.com.br/ws/${argCep}/json/`;
    fetch(url)
    .then(resp => resp.json())
    .then(data =>{
      console.log(data)
      setCep(data)
    })
    .catch(error =>{console.log("? " + error)});
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      
      <Text>coloca teu CEP ai</Text>
      <TextInput 
        placeholder="digita aqui meu"
        value={inputCep}
        onChangeText={setInputCep}
      />
      <StatusBar style="auto" />
      <Button
        title='Cep'
        onPress={ () =>{ BuscaCep(inputCep)}}
      />
      { loading && <ActivityIndicator size="large" color="blue"/>
      
      }
      {
        cep.logradouro != null && (
          <Text> Endereço : {cep.logradouro} </Text>
        )
      }
      {
        cep.bairro != null && (
          <Text> Bairro: {cep.bairro} </Text>
        )
      }
      {
        cep.cidade != null && (
          <Text> Cidade : {cep.cidade} </Text>
        )
      }
      {
        cep.estado != null && (
          <Text> Estado : {cep.estado} </Text>
        )
      }
      {
        cep.numero != null && (
          <Text> Numero : {cep.numero} </Text>
        )
      }
      {
        cep.complemento != null && (
          <Text> Complemento : {cep.complemento} </Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
