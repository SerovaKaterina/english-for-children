import React, { useState } from 'react';
import Header from './components/Header/Header';
import Button from './components/Buttons/Button';
import TransportCard from './components/Carousel/TransportCard'; // Импорт компонента TransportCard
import styles from './App.module.css';
import transportData from './data/transport.json'; // Импорт данных о транспорте

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
      {selectedCategory === "Транспорт" && (
        <div className={styles.transport}>
          {transportData.map((transport) => (
            <TransportCard 
            key={transport.id}
            url={transport.url}
            english={transport.english}
            transcription={transport.transcription}
            russian={transport.russian}
             />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;