import React, { useState } from 'react';
import Header from './components/Header/Header';
import Button from './components/Buttons/Button';
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
    <div className={styles.app} >
      <Header />
      <Button onSelectCategory={handleCategorySelect} /> {/* Передача функции обработки выбора категории */}
      {selectedCategory === "Транспорт" && <Carousel items={transportData} />}
      {selectedCategory === "Одежда" && <Carousel items={clothesData} />}

        </div>
      );
    }
 
export default App;