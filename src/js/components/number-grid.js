// Number Grid Component
// Displays numbers 1-10 with pronunciations

document.addEventListener('alpine:init', () => {
    Alpine.data('numberGrid', () => ({
        numbers: [],
        loading: false,
        
        init() {
            this.fetchNumbers();
        },
        
        async fetchNumbers() {
            this.loading = true;
            try {
                const response = await fetch('/api/lessons/lesson-01/numbers');
                const data = await response.json();
                this.numbers = data.numbers || data;
            } catch (error) {
                console.error('Error fetching numbers:', error);
                // Fallback to local data
                try {
                    const response = await fetch('/data/lesson-01/numbers.json');
                    const data = await response.json();
                    this.numbers = data.numbers || data;
                } catch (localError) {
                    console.error('Error fetching local numbers:', localError);
                }
            } finally {
                this.loading = false;
            }
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
                // Fallback to Web Speech API
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'en-US';
                    speechSynthesis.speak(utterance);
                }
            }
        }
    }));
});