import { Suspense } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { Home } from './src/home';
import { databaseInit } from './src/database/databaseInit';
import { bilada } from './src/bilada';


export default function App() {
  
  return (
    <Suspense fallback={ bilada() }>
      <SQLiteProvider databaseName='bancoCus' onInit={databaseInit} useSuspense>
        <Home/>
      </SQLiteProvider>
    </Suspense>
  
  )
}