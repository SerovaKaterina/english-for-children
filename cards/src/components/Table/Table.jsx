import React from 'react';
import styles from './Table.module.css';
import transportData from '../../data/transport.json';
import clothesData from'../../data/сlothes.json';

function Table({ showTable }) {
  // Ваши данные для отображения в таблице
  const data = [...transportData, ...clothesData ];

  return (
    <div className={styles.tableContainer}>
      {/* Отображаем содержание таблицы, если showTable === true */}
      {showTable && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Слово</th>
              <th>Транскрипция</th>
              <th>Перевод</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.russian}</td>
                <td>{item.transcription}</td>
                <td>{item.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;