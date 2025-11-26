import { type SQLiteDatabase } from "expo-sqlite";
import { semente } from "./semente";

export async function databaseInit(db: SQLiteDatabase) {

    await createTable(db);
    await semente(db);
      
}

// criar uma tabela no banco de dados
async function createTable(db: SQLiteDatabase) {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS USUARIO (
                ID_US INTEGER PRIMARY KEY AUTOINCREMENT,
                NOME_US VARCHAR(100),
                EMAIL_US VARCHAR(100)
            )`);
    }
    catch (error) {
        console.error("Erro ao criar a tabela:", error);
    }
}

export async function deletarUsuario(db:SQLiteDatabase, id:number) {
    try{
        await db.runAsync("DELETE FROM USUARIO WHERE ID_US = ?", [id]);
        console.log("Usuario moggado com sucesso!! ID: " + id);
    }catch(error){
        console.log("ERRO ao moggar usario " + error);
    }
}

// Função para atualizar nome e email do usuário
export async function atualizarUsuario(db: SQLiteDatabase, id: number, nome: string, email: string) {
    try {
        await db.runAsync('UPDATE USUARIO SET NOME_US = ?, EMAIL_US = ? WHERE ID_US = ?', [nome, email, id]);
        console.log("Usuário atualizado com sucesso! ID: " + id);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
    }
}

// Dropar tabela e recriar do zero
export async function resetarTabela(db: SQLiteDatabase) {
    try {
        await db.execAsync("DROP TABLE IF EXISTS USUARIO");
        console.log("Tabela deletada!");
        await createTable(db);
        await semente(db);
        console.log("Tabela recriada com dados iniciais!");
    } catch (error) {
        console.error("Erro ao resetar tabela:", error);
    }
}

// Criar uma função que insere dados
export async function InserirDados(nome:string, email:string, db:SQLiteDatabase) {
    try{
        const resultado = await db.runAsync('insert into USUARIO(NOME_US, EMAIL_US) VALUES (?,?)', nome, email);
        console.log("Inserido Radicalmente com muita aura!!" + resultado.lastInsertRowId)
    }catch(error){
        console.log("erro ao inserir" + error)
    }  
}
