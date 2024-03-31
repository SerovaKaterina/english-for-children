import React, { useState } from 'react';
import styles from './Table.module.css';
import transportData from '../../data/transport.json';
import clothesData from'../../data/сlothes.json';

function Table({ showTable }) {
  const [editing, setEditing] = useState({});
  const [editedData, setEditedData] = useState([]);
  
  const data = [...transportData, ...clothesData];

  // Обработчик изменения значения поля
  const handleFieldChange = (id, field, value) => {
    const newData = editedData.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setEditedData(newData);
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = (id) => {
    setEditing(prevState => ({ ...prevState, [id]: false }));
    setEditedData(prevData => prevData.filter(item => item.id !== id));
  };

  // Обработчик сохранения изменений
  const handleSaveChanges = (id) => {
    setEditing(prevState => ({ ...prevState, [id]: false }));
    setEditedData(prevData => prevData.filter(item => item.id !== id));
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
                      value={editedData.find(dataItem => dataItem.id === item.id)?.russian || item.russian}
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
                      value={editedData.find(dataItem => dataItem.id === item.id)?.transcription || item.transcription}
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
                      value={editedData.find(dataItem => dataItem.id === item.id)?.english || item.english}
                      onChange={(e) => handleFieldChange(item.id, 'english', e.target.value)}
                    />
                  ) : (
                    item.english
                  )}
                </td>
                <td>
                  {editing[item.id] ? (
                    <div className={styles.change}>
                      <button onClick={() => handleSaveChanges(item.id)}>Сохранить</button>
                      <button onClick={() => handleCancelEdit(item.id)}>Отмена</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditing(prevState => ({ ...prevState, [item.id]: true }))}>Редактировать</button>
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