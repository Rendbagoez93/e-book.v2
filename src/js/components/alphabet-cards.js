// Alphabet Cards Component
// Manages the display and interaction of alphabet letter cards

document.addEventListener('alpine:init', () => {
    Alpine.data('alphabetCards', () => ({
        letters: [],
        currentLetter: null,
        loading: false,
        
        init() {
            this.fetchLetters();
        },
        
        async fetchLetters() {
            this.loading = true;
            try {
                const response = await fetch('/api/lessons/lesson-01/letters');
                const data = await response.json();
                this.letters = data.letters || data;
            } catch (error) {
                console.error('Error fetching letters:', error);
                // Fallback to local data
                try {
                    const response = await fetch('/data/lesson-01/letters.json');
                    const data = await response.json();
                    this.letters = data.letters || data;
                } catch (localError) {
                    console.error('Error fetching local letters:', localError);
                }
            } finally {
                this.loading = false;
            }
        },
        
        selectLetter(letter) {
            this.currentLetter = letter;
            console.log('Selected letter:', letter);
        },
        
        clearSelection() {
            this.currentLetter = null;
        },
        
        async playAudio(text) {
            try {
                const response = await fetch(`/api/audio/generate?text=${encodeURIComponent(text)}`);
                const data = await response.json();
                
                if (data.audio_url) {
                    const audio = new Audio(data.audio_url);
                    audio.play();
                }
            } catch (error) {
                console.error('Error playing audio:', error);
                // Fallback to Web Speech API if available
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'en-US';
                    speechSynthesis.speak(utterance);
                }
            }
        }
    }));
});