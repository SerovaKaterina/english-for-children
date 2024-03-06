import React, { useState } from 'react';
import Header from './components/Header/Header';
import Button from './components/Buttons/Button';
import TransportCard from './components/Carousel/TransportCard'; // Импорт компонента TransportCard
import './App.css';
import transportData from './data/transport'; // Импорт данных о транспорте

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(handleCategorySelect)
  };

  return (
    <div className="App">
      <Header />
      <Button onSelectCategory={handleCategorySelect} /> {/* Передача функции обработки выбора категории */}
      {selectedCategory === "Транспорт" && (
        <div className="transport-carousel">
          {transportData.map((transport) => (
            <TransportCard key={transport.id} transport={transport} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;