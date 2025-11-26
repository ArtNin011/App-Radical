
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { type SQLiteDatabase } from "expo-sqlite";
import { deletarUsuario } from './database/databaseInit';
import { EditarModal } from './EditarModal';

export function criarBudega({usuario, db, onDelete}: {usuario: any, db: SQLiteDatabase, onDelete: () => void}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
        <View 
        style={{padding: 16,
            borderRadius: 10,
            backgroundColor: '#f5df96ff',
            gap: 12}
        }
        >
        <Text>{usuario.NOME_US}</Text>
        <Text>{usuario.EMAIL_US}</Text>
        <Pressable
            style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#041c30c9' : '#041c30ff', 
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                alignItems: 'center',
            }
            ]}
            onPress={async () => {
                await deletarUsuario(db, usuario.ID_US);
                onDelete();
            }}
            accessibilityLabel="Deletar"
        >
            <Text style={{color: 'white'}}>Deletar</Text>
        </Pressable>
        <Pressable
            style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#041c30c9' : '#041c30ff', 
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                alignItems: 'center',
            }
            ]}
            onPress={() => setModalVisible(true)}
            accessibilityLabel="Editar"
            
        >
            <Text style={{color: 'white'}}>Editar</Text>
        </Pressable>
        </View>

        <EditarModal 
            visible={modalVisible}
            usuario={usuario}
            db={db}
            onClose={() => setModalVisible(false)}
            onUpdate={() => onDelete()}
        />
        </>
    )
}
