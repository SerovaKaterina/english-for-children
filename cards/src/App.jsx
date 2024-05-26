import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import Table from './components/Table/Table';
import Carousel from './components/Carousel/Carousel';
import styles from './App.module.css';
import transportData from './data/transport.json';
import clothesData from './data/сlothes.json'; 
import WordsStore from './mobX/WordsStore';
import { Provider } from "mobx-react";

const words = {
  wordsStore: new WordsStore(),
}
 
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showTable, setShowTable] = useState(false); // состояние для управления видимостью таблицы

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowTable(false); // скрываем таблицу при выборе категории
  };

  const handleTableClick = () => {
    setShowTable(true); // устанавливаем состояние, чтобы показать таблицу при клике на ссылку "Table"
  };

  return (
    <Provider {...words}>
    <Router>
      <div className={styles.app}>
        <Header />
        <NavBar onTableClick={handleTableClick} />
        <Routes>
          <Route path="/" element={<Table showTable={showTable} />} />
          <Route path="/cards" element={<Cards onSelectCategory={handleCategorySelect} />} />
          <Route path="/table" element={<Table showTable={showTable} />} />
          <Route path="/carousel/transport" element={<Carousel items={transportData} />} />
          <Route path="/carousel/clothes" element={<Carousel items={clothesData} />} />
        </Routes>
        {/* показываем карусель, в зависимости от выбранной категори */}
        {selectedCategory === 'Транспорт' && <Carousel items={transportData} />}
        {selectedCategory === 'Одежда' && <Carousel items={clothesData} />}
      </div>
    </Router>
    </Provider>
  );
}

export default App;