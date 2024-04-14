import React, { useState } from 'react';
import styles from './Table.module.css';
import transportData from '../../data/transport.json';
import clothesData from '../../data/сlothes.json';

function Table({ showTable }) {
  const [editing, setEditing] = useState({});
  const [editedData, setEditedData] = useState({});
  
  const data = [...transportData, ...clothesData];

  // Обработчик изменения значения поля
  const handleFieldChange = (id, field, value) => {
    setEditedData(prevState => ({ ...prevState, [id]: { ...prevState[id], [field]: value } }));
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = (id) => {
    setEditing(prevState => ({ ...prevState, [id]: false }));
    // Очистить измененные данные при отмене редактирования
    setEditedData(prevState => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  // Обработчик сохранения изменений
  const handleSaveChanges = (id) => {
    setEditing(prevState => ({ ...prevState, [id]: false }));
    // Обновить данные после сохранения изменений
    // Например, можно отправить измененные данные на сервер
    console.log("Сохраненные изменения:", editedData[id]);
  };

  return (
    <div className={styles.tableContainer}>
      {showTable && (
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
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editing[item.id] ? (
                    <input
                      type="text"
                      value={editedData[item.id]?.russian || item.russian}
                      onChange={(e) => handleFieldChange(item.id, 'russian', e.target.value)}
                    />
                  ) : (
                    item.russian
                  )}
                </td>
                <td>
                  {editing[item.id] ? (
                    <input
                      type="text"
                      value={editedData[item.id]?.transcription || item.transcription}
                      onChange={(e) => handleFieldChange(item.id, 'transcription', e.target.value)}
                    />
                  ) : (
                    item.transcription
                  )}
                </td>
                <td>
                  {editing[item.id] ? (
                    <input
                      type="text"
                      value={editedData[item.id]?.english || item.english}
                      onChange={(e) => handleFieldChange(item.id, 'english', e.target.value)}
                    />
                  ) : (
                    item.english
                  )}
                </td>
                <td>
                  {editing[item.id] ? (
                    <div className={styles.change}>
                      <button className={styles.save} onClick={() => handleSaveChanges(item.id)}>Сохранить</button>
                      <button className={styles.cancel} onClick={() => handleCancelEdit(item.id)}>Отмена</button>
                    </div>
                  ) : (
                    <button className={styles.edit} onClick={() => setEditing(prevState => ({ ...prevState, [item.id]: true }))}>Редактировать</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;