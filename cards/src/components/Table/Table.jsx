import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './Table.module.css';

function Table({ wordsStore }) {
  // Получаем необходимые данные и методы из хранилища слов
  const { words, fetchWords, addWord, updateWord, deleteWord, loading, error } = wordsStore;
  
  // Состояния для редактирования, предыдущих данных и нового слова
  const [editingId, setEditingId] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [newWord, setNewWord] = useState({ russian: '', transcription: '', english: '' });

  // Обработчик изменения значения поля
  const handleFieldChange = (id, field, value) => {
    updateWord({ id, [field]: value }); // Обновляем слово в хранилище
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = () => {
    if (previousData !== null) {
      fetchWords(previousData); // Восстанавливаем предыдущие данные
      setPreviousData(null);
    }
    setEditingId(null);
  };

  // Обработчик сохранения изменений
  const handleSaveChanges = async (item) => {
    try {
      await updateWord(item); // Обновляем слово на сервере
      setEditingId(null);
      setPreviousData(null);
    } catch (error) {
      console.error('Failed to update word:', error);
    }
  };

  // Обработчик добавления нового слова
  const handleAddWord = async () => {
    try {
      await addWord(newWord); // Добавляем новое слово на сервере
      setNewWord({ russian: '', transcription: '', english: '' });
    } catch (error) {
      console.error('Failed to add word:', error);
    }
  };

  // Функция для проверки, содержит ли объект пустые значения
  const hasEmptyFields = (obj) => {
    return Object.values(obj).some(value => value === '');
  };

  // Если данные загружаются, показываем сообщение о загрузке
  if (loading) {
    return <div>Loading...</div>;
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Отображаем таблицу
  return (
    <div className={styles.tableContainer}>
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
                onChange={(e) => setNewWord({ ...newWord, russian: e.target.value })}
                placeholder="Новое слово"
              />
            </td>
            <td>
              <input
                type="text"
                value={newWord.transcription}
                onChange={(e) => setNewWord({ ...newWord, transcription: e.target.value })}
                placeholder="Транскрипция"
              />
            </td>
            <td>
              <input
                type="text"
                value={newWord.english}
                onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
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
    </div>
  );
}

export default inject('wordsStore')(observer(Table));