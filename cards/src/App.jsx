import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import Table from './components/Table/Table';
import Carousel from './components/Carousel/Carousel';
import styles from './App.module.css';
import transportData from './data/transport.json';
import clothesData from './data/сlothes.json'; 
import { WordProvider } from './context/WordContext'; // Импортируем провайдер контекста

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showTable, setShowTable] = React.useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowTable(false);
  };

  const handleTableClick = () => {
    setShowTable(true);
  };

  return (
    <Router>
      <WordProvider> {/* Обернем приложение провайдером контекста */}
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
          {selectedCategory === 'Транспорт' && <Carousel items={transportData} />}
          {selectedCategory === 'Одежда' && <Carousel items={clothesData} />}
        </div>
      </WordProvider>
    </Router>
  );
}

export default App;