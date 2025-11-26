import { type SQLiteDatabase } from "expo-sqlite";

const nomes: string[] = [
    "Minos Prime", "Xarles Xavier", "relampago mcqueen", "Arthur Morgan", "Freddy Fazbear",
    "Nelipe Feto", "Chaves", "Kratos GodiOfWa", "spamtom.g.spamton"
];

const emails: string[] = [
    "KingOfLust@Hotmail.com",
    "Careca@gmail.com",
    "catchaul@gmail.com",
    "ArthurAmoxtradoLeitoso@hotmail.com",
    "UrUrUrUrUrUrUrUrUrUr@gmail.com",
    "FeliteTetano@gmail.com",
    "ChavesDeuOito.Oficial@gmail.com",
    "kratosDaSilvaPinto@hotmail.com",
    "theBestOf[1997]@hochiMamma.com"
];

export async function semente(db: SQLiteDatabase){
    await db.withTransactionAsync(async() =>{
        for(let i = 0; i < nomes.length; i++){
            await db.runAsync('INSERT INTO USUARIO (NOME_US, EMAIL_US) VALUES (?, ?)', nomes[i], emails[i]);
        }
    })
}