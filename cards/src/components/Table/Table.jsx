import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './Table.module.css';

function Table({ wordsStore }) {
  const { words, fetchWords, addWord, updateWord, deleteWord, loading, error } = wordsStore;
  const [editingId, setEditingId] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [newWord, setNewWord] = useState({ russian: '', transcription: '', english: '' });

  const handleFieldChange = (id, field, value) => {
    updateWord({ id, [field]: value });
  };

  const handleCancelEdit = () => {
    if (previousData !== null) {
      fetchWords(previousData);
      setPreviousData(null);
    }
    setEditingId(null);
  };

  const handleSaveChanges = async (item) => {
    try {
      await updateWord(item);
      setEditingId(null);
      setPreviousData(null);
    } catch (error) {
      console.error('Failed to update word:', error);
    }
  };

  const handleAddWord = async () => {
    try {
      await addWord(newWord);
      setNewWord({ russian: '', transcription: '', english: '' });
    } catch (error) {
      console.error('Failed to add word:', error);
    }
  };

  const hasEmptyFields = (obj) => {
    return Object.values(obj).some(value => value === '');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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