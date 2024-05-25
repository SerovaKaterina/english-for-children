import React, { createContext, useState, useEffect } from 'react';

const API_WORDS = 'https://itgirlschool.justmakeit.ru/api/words';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_WORDS);
      if (!response.ok) {
        throw new Error('Failed to fetch words');
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async (newWord) => {
    try {
      const response = await fetch(API_WORDS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWord),
      });

      if (!response.ok) {
        throw new Error('Failed to add word');
      }

      const data = await response.json();
      setWords(prevWords => [...prevWords, data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateWord = async (updatedWord) => {
    try {
      const response = await fetch(`${API_WORDS}/${updatedWord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWord),
      });

      if (!response.ok) {
        throw new Error('Failed to update word');
      }

      const data = await response.json();
      setWords(prevWords => prevWords.map(word => (word.id === data.id ? data : word)));
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteWord = async (id) => {
    try {
      const response = await fetch(`${API_WORDS}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete word');
      }

      setWords(prevWords => prevWords.filter(word => word.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <WordContext.Provider value={{ words, setWords, loading, error, addWord, updateWord, deleteWord }}>
      {children}
    </WordContext.Provider>
  );
};