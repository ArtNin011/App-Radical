import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Modal } from 'react-native';
import { type SQLiteDatabase } from "expo-sqlite";
import { atualizarUsuario } from './database/databaseInit';

interface EditarModalProps {
  visible: boolean;
  usuario: any;
  db: SQLiteDatabase;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditarModal({ visible, usuario, db, onClose, onUpdate }: EditarModalProps) {
  const [nome, setNome] = useState(usuario?.NOME_US || '');
  const [email, setEmail] = useState(usuario?.EMAIL_US || '');

  const handleAlterar = async () => {
    if (!nome.trim() || !email.trim()) {
      alert('Preencha todos os campos seu BANANÃO!');
      return;
    }
    await atualizarUsuario(db, usuario.ID_US, nome, email);
    onUpdate();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar Usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#ffffffff"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ffffffff"
          />

          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleAlterar}
              style={({ pressed }) => [styles.button, styles.alterarBtn, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>Alterar</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.button, styles.cancelarBtn, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#041c30ff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  alterarBtn: {
    backgroundColor: '#f5df96ff',
  },
  cancelarBtn: {
    backgroundColor: '#f44336',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#000000ff',
    fontWeight: '600',
  },
});
