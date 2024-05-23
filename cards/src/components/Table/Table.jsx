import React, { useState, useContext } from 'react';
import styles from './Table.module.css';
import { WordContext } from '../../context/WordContext.jsx'; // Импортируйте ваш контекст

function Table({ showTable }) {
    const { words, updateWord, deleteWord } = useContext(WordContext); // Получаем слова и методы из контекста
    const [editingId, setEditingId] = useState(null);
    const [previousData, setPreviousData] = useState(null);

    // Обработчик изменения значения поля
    const handleFieldChange = (id, field, value) => {
        updateWord(id, { [field]: value }); // Вызываем метод обновления слова из контекста
    };

    // Обработчик отмены редактирования
    const handleCancelEdit = () => {
        if (previousData !== null) {
            // setData(previousData); // Не нужно, так как данные хранятся в контексте
            setPreviousData(null);
        }
        setEditingId(null);
    };

    // Обработчик сохранения изменений
    const handleSaveChanges = () => {
        // setPreviousData(null); // Не нужно, так как данные хранятся в контексте
        setEditingId(null);
    };

    // Проверка, содержит ли объект пустые значения
    const hasEmptyFields = (obj) => {
        return Object.values(obj).some(value => value === "");
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
                                            <button className={styles.save} onClick={handleSaveChanges} disabled={hasEmptyFields(item)}>Сохранить</button>
                                            <button className={styles.cancel} onClick={handleCancelEdit}>Отмена</button>
                                        </div>
                                    ) : (
                                        <button className={styles.edit} onClick={() => { setEditingId(item.id); setPreviousData([...words]); }}>Редактировать</button>
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