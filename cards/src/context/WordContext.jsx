import React, { createContext, useState, useEffect } from 'react';

const AllWords = 'https://itgirlschool.justmakeit.ru/api/words';

// Создаем контекст для слов
const WordContext = createContext();

const WordProvider = ({ children }) => {
  // Определяем состояние для хранения слов, индикатора загрузки и ошибок
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для получения списка слов с сервера
  const fetchWords = async () => {
    setLoading(true); // Устанавливаем индикатор загрузки в true
    try {
      const response = await fetch(AllWords); // Отправляем запрос на сервер
      if (!response.ok) {
        throw new Error('Failed to fetch words'); // Обрабатываем ошибку ответа сервера
      }
      const data = await response.json(); // Преобразуем ответ в JSON
      setWords(data); // Обновляем состояние слов
    } catch (error) {
      setError(error.message); // Обновляем состояние ошибки
    } finally {
      setLoading(false); // Отключаем индикатор загрузки
    }
  };

  // Функция для добавления нового слова на сервер
  const addWord = async (newWord) => {
    try {
      const response = await fetch(AllWords, {
        method: 'POST', // Метод POST для добавления данных
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWord), // Передаем новое слово в формате JSON
      });

      if (!response.ok) {
        throw new Error('Failed to add word');
      }

      const data = await response.json(); // Преобразуем ответ в JSON
      setWords(prevWords => [...prevWords, data]); // Добавляем новое слово в состояние
    } catch (error) {
      setError(error.message); // Обновляем состояние ошибки
    }
  };

  // Функция для обновления существующего слова на сервере
  const updateWord = async (updatedWord) => {
    try {
      const response = await fetch(`${AllWords}/${updatedWord.id}`, {
        method: 'PUT', // Метод PUT для обновления данных
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWord), // Передаем обновленное слово в формате JSON
      });

      if (!response.ok) {
        throw new Error('Failed to update word'); // Обрабатываем ошибку ответа сервера
      }

      const data = await response.json(); // Преобразуем ответ в JSON
      setWords(prevWords => prevWords.map(word => (word.id === data.id ? data : word))); // Обновляем состояние слов
    } catch (error) {
      setError(error.message); // Обновляем состояние ошибки
    }
  };

  // Функция для удаления слова с сервера
  const deleteWord = async (id) => {
    try {
      const response = await fetch(`${AllWords}/${id}`, {
        method: 'DELETE', // Метод DELETE для удаления данных
      });

      if (!response.ok) {
        throw new Error('Failed to delete word'); // Обрабатываем ошибку ответа сервера
      }

      setWords(prevWords => prevWords.filter(word => word.id !== id)); // Удаляем слово из состояния
    } catch (error) {
      setError(error.message); // Обновляем состояние ошибки
    }
  };

  // Получаем слова при монтировании компонента
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    // Оборачиваем дочерние компоненты в провайдер контекста, передавая значения и функции
    <WordContext.Provider value={{ words, setWords, loading, error, addWord, updateWord, deleteWord }}>
      {children}
    </WordContext.Provider>
  );
};

export {WordContext, WordProvider};