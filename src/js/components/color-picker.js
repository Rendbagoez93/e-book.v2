// Color Picker Component
// Displays color swatches and handles color selection

document.addEventListener('alpine:init', () => {
    Alpine.data('colorPicker', () => ({
        colors: [],
        selectedColor: null,
        loading: false,

        init() {
            this.fetchColors();
        },

        async fetchColors() {
            this.loading = true;
            try {
                const response = await fetch('/api/lessons/lesson-01/colors');
                const data = await response.json();
                this.colors = data.colors || data;
            } catch (error) {
                console.error('Error fetching colors:', error);
                // Fallback to local data
                try {
                    const response = await fetch('/data/lesson-01/colors.json');
                    const data = await response.json();
                    this.colors = data.colors || data;
                } catch (localError) {
                    console.error('Error fetching local colors:', localError);
                }
            } finally {
                this.loading = false;
            }
        },

        selectColor(color) {
            this.selectedColor = color;
            console.log('Selected color:', color);
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