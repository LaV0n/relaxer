import React from 'react'
import styles from './App.module.css'
import { Header } from '../features/Header/Header'
import { Joke } from '../features/Memes/Joke'
import { Route, Routes } from 'react-router-dom'
import { Events } from '../features/Events/Events'

function App() {
   return (
      <div className={styles.App}>
         <Header />
         <Routes>
            <Route path={'/joke'} element={<Joke />} />
            <Route path={'/'} element={<Events />} />
         </Routes>
      </div>
   )
}

export default App
