import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Pressable, FlatList,TextInput } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { InserirDados, deletarUsuario, resetarTabela } from "./database/databaseInit";
import { criarBudega as CriarBudega } from "./criarBudega";
import { bilada } from './bilada';


export function Home(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const db = useSQLiteContext();
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    async function carregarUsuarios(){
        try{
            setIsLoading(true);
            const resultado = await db.getAllAsync('SELECT * FROM USUARIO');
        
            if(resultado){
                setUsuarios(resultado);
            }
            else{
                console.log("Deu ruim ai meu rei, não SOBROU NADA!!!.");
            }
        }   
        catch(error){
            console.log("Erro ao carregar usuarios: " + error);
        }
        finally{
            setIsLoading(false);
        }
    }


    useEffect(() => {
        carregarUsuarios();
    }, []);


    return (
        <View style={styles.UltraContainer}>
            <View style={styles.container}>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: '80%',
                        marginTop: 10,
                        paddingLeft: 10,
                        color: 'white',
                    }}
                    placeholderTextColor="white"
                    placeholder="Coloque seu nome:"
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        width: '80%',
                        marginTop: 10,
                        paddingLeft: 10,
                        color: 'white',
                    }}
                    placeholderTextColor="white"
                    placeholder="coloque seu Email:"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Pressable
                    style={({ pressed }) => [
                    {
                    backgroundColor: pressed ? '#1c5686b0' : '#1f5e92ff', 
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    }
                    ]}
                    onPress={async () => { InserirDados(nome, email, db); await carregarUsuarios(); setEmail(''); setNome(''); }}
                    accessibilityLabel="cadastrar"
                >
                    <Text style={{color: 'white'}}>Cadastrar</Text>
                </Pressable>

                <FlatList 
                    data={usuarios}
                    keyExtractor={item => item.ID_US.toString()}
                    renderItem={({item}) => <CriarBudega usuario={item} db={db} onDelete={() => carregarUsuarios()}/>}
                    contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16, gap: 12}}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={() => isLoading ? bilada() : null}
                />
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        backgroundColor: '#041c30ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
     UltraContainer: {
        flex: 1,
        backgroundColor: '#1f5e92ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
