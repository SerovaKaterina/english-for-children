import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import Table from './components/Table/Table'
import Carousel from './components/Carousel/Carousel';
import styles from './App.module.css';
import transportData from './data/transport.json'; // Импорт данных о транспорте
import clothesData from './data/сlothes.json'; // Импорт данных о транспорте
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(handleCategorySelect)
  };

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route
            path="/cards"
            element={<Cards onSelectCategory={handleCategorySelect} />}
            />
        </Routes>
            
         {selectedCategory === 'Транспорт' && <Carousel items={transportData} />
                }
           {selectedCategory === 'Одежда' && <Carousel items={clothesData} />}
          
      </div>
    </Router>
  );
}

export default App;