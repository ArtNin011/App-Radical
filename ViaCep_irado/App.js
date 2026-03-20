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
      
      <Text style={styles.texto}>coloca teu CEP ai</Text>
      <TextInput 
        placeholder="digita aqui meu"
        placeholderTextColor="white"
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
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Endereço: </Text>
            <TextInput style={styles.texto} 
              value={cep.logradouro}      
            />
          </View>
        
        )
      }
      {
        cep.bairro != null && (
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Bairro: </Text>
            <TextInput style={styles.texto} 
              value={cep.bairro}      
            />
          </View>
        )
      }
      {
        cep.cidade != null && (
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Cidade: </Text>
            <TextInput style={styles.texto} 
              value={cep.cidade}      
            />
          </View>
        )
      }
      {
        cep.estado != null && (
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Estado: </Text>
            <TextInput style={styles.texto} 
              value={cep.estado}      
            />
          </View>
        )
      }
      {
        cep.numero != null && (
          <View style={styles.arthurNinja3000}>
            <Text style={styles.label}>Número: </Text>
            <TextInput style={styles.texto} 
              value={cep.numero}      
            />
          </View>
        )
      }
      {
        cep.complemento != null && (
          <Text style={styles.texto}> Complemento : {cep.complemento} </Text>
        )
      }
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
});
