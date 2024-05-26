import { makeAutoObservable } from "mobx";

const AllWords = 'https://itgirlschool.justmakeit.ru/api/words';

class WordsStore {
    words = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchWords = async () => {
        this.loading = true;
        try {
            const response = await fetch(AllWords);
            if (!response.ok) {
                throw new Error('Failed to fetch words');
            }
            const data = await response.json();
            this.words = data;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    };

    addWord = async (value) => {
        try {
            const response = await fetch(AllWords, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    english: value.english,
                    transcription: value.transcription,
                    russian: value.russian,
                    tags: []
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add word');
            }
            await this.fetchWords(); // Reload words after adding a new one
        } catch (error) {
            this.error = error.message;
        }
    };

    updateWord = async (updatedWord) => {
        try {
            const response = await fetch(`${AllWords}/${updatedWord.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWord)
            });
            if (!response.ok) {
                throw new Error('Failed to update word');
            }
            await this.fetchWords(); // Reload words after updating
        } catch (error) {
            this.error = error.message;
        }
    };

    deleteWord = async (id) => {
        try {
            const response = await fetch(`${AllWords}/${id}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to delete word');
            }
            this.words = this.words.filter(word => word.id !== id);
        } catch (error) {
            this.error = error.message;
        }
    };
}

export default WordsStore;