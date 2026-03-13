import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

export default function App() {

  const [cep, setCep] = useState([]);

  const [loading, setLoading] = useState(false);

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
      <Text>coloca teu endereço ait</Text>
      <StatusBar style="auto" />
      <Button
        title='Cep'
        onPress={ () =>{ BuscaCep('18076219')}}
      />
      { loading && <ActivityIndicator size="large" color="blue"/>
      
      }
      {
        cep.logradouro != null && (
          <Text> Endereço : {cep.logradouro} </Text>
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
