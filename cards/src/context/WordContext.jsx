import React, {createContext, useState, useEffect} from "react";

const API_ALL_WORDS ='https://itgirlschool.justmakeit.ru/api/words';

const WordContext = createContext();

const WordProvider = ({children}) => {
const [words, setWords] = useState([]);

const addWord = (newWord) => {
setWords([...words, newWord]);
};

const getWords = async () => {
try {
const response = await fetch(
API_ALL_WORDS
);
if (!response.ok) {
throw new Error("Failed to fetch words");
}
const data = await response.json();

setWords(data);
} catch (error) {
console.error("Error fetching info:", error);
}
};

const updateWord = async (id, updatedWord) => {
const body = {
english: updatedWord.english,
id: id,
russian: updatedWord.russian,
tags: "",
tags_json: "[\"\"]",
transcription: updatedWord.transcription
}

try {
const response = await fetch(
`${API_ALL_WORDS}/$370274675/update`,
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(body),
}
);

if (!response.ok) {
throw new Error("Failed to update word");
}
const data = await response.json();

setWords((prevWords) =>
prevWords.map((word) => (word.id === id ? data : word))
);
} catch (error) {
console.error("Error updating word:", error);
}
};

const deleteWord = async (id) => {
try {
const response = await fetch(
`${API_ALL_WORDS}/$370274675/delete`,
{
method: "POST",
}
);
if (!response.ok) {
throw new Error("Failed to delete word");
}

setWords((prevWords) => prevWords.filter((word) => word.id !== id)); // Удаляем слово из состояния слов в контексте
} catch (error) {
console.error("Error deleting word:", error);
}
};

useEffect(() => {
getWords();
}, []);

return (
<WordContext.Provider value={{words, addWord, updateWord, deleteWord, setWords}}>
{children}
</WordContext.Provider>
);
};