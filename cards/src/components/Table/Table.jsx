import React, { useContext, useState } from 'react';
import styles from './Table.module.css';
import { WordContext } from '../../context/WordContext';
import Loading from '../Loading/Loading'; // Путь к компоненту Loading

function Table({ showTable }) {
  const { words, setWords, addWord, updateWord, deleteWord, loading, error } = useContext(WordContext); // Добавлены loading и error из контекста
  const [editingId, setEditingId] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [newWord, setNewWord] = useState({ russian: '', transcription: '', english: '' });

  // Обработчик изменения значения поля
  const handleFieldChange = (id, field, value) => {
    setWords(prevWords =>
      prevWords.map(word =>
        word.id === id ? { ...word, [field]: value } : word
      )
    );
  };

  // Обработчик изменения значения для нового слова
  const handleNewWordChange = (field, value) => {
    setNewWord(prevWord => ({
      ...prevWord,
      [field]: value
    }));
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = () => {
    if (previousData !== null) {
      setWords(previousData);
      setPreviousData(null);
    }
    setEditingId(null);
  };

  // Обработчик сохранения изменений
  const handleSaveChanges = async (item) => {
    try {
      await updateWord(item); // Обновление слова на сервере
      setEditingId(null);
      setPreviousData(null);
    } catch (error) {
      console.error('Failed to update word:', error);
    }
  };

  // Обработчик добавления нового слова
  const handleAddWord = async () => {
    try {
      await addWord(newWord); // Добавление нового слова на сервере
      setNewWord({ russian: '', transcription: '', english: '' });
    } catch (error) {
      console.error('Failed to add word:', error);
    }
  };

  // Проверка, содержит ли объект пустые значения
  const hasEmptyFields = (obj) => {
    return Object.values(obj).some(value => value === "");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>; // Показывать сообщение об ошибке
  }

  return (
    <div className={styles.tableContainer}>
      {showTable && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Слово</th>
                <th>Транскрипция</th>
                <th>Перевод</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {words.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={item.russian}
                        onChange={(e) => handleFieldChange(item.id, 'russian', e.target.value)}
                      />
                    ) : (
                      item.russian
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={item.transcription}
                        onChange={(e) => handleFieldChange(item.id, 'transcription', e.target.value)}
                      />
                    ) : (
                      item.transcription
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={item.english}
                        onChange={(e) => handleFieldChange(item.id, 'english', e.target.value)}
                      />
                    ) : (
                      item.english
                    )}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <div className={styles.change}>
                        <button
                          className={styles.save}
                          onClick={() => handleSaveChanges(item)}
                          disabled={hasEmptyFields(item)}
                        >
                          Сохранить
                        </button>
                        <button className={styles.cancel} onClick={handleCancelEdit}>
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className={styles.edit}
                          onClick={() => { setEditingId(item.id); setPreviousData([...words]); }}
                        >
                          Редактировать
                        </button>
                        <button
                          className={styles.delete}
                          onClick={() => deleteWord(item.id)}
                        >
                          Удалить
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Новый</td>
                <td>
                  <input
                    type="text"
                    value={newWord.russian}
                    onChange={(e) => handleNewWordChange('russian', e.target.value)}
                    placeholder="Новое слово"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newWord.transcription}
                    onChange={(e) => handleNewWordChange('transcription', e.target.value)}
                    placeholder="Транскрипция"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newWord.english}
                    onChange={(e) => handleNewWordChange('english', e.target.value)}
                    placeholder="Перевод"
                  />
                </td>
                <td>
                  <button
                    className={styles.add}
                    onClick={handleAddWord}
                    disabled={hasEmptyFields(newWord)}
                  >
                    Добавить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Table;