// Sentences Component
// Manages the display and interaction of English sentences with Bahasa translations
// Displays sentences with translations, pronunciations, and audio playback

document.addEventListener('alpine:init', () => {
    Alpine.data('sentencesComponent', () => ({
        sentences: [],
        currentSentence: null,
        loading: false,
        filterCategory: 'all',
        showTranslation: true,
        
        init() {
            this.fetchSentences();
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentSentence) {
                    this.clearSelection();
                }
                // Toggle translation with 'T' key
                if (e.key === 't' || e.key === 'T') {
                    this.toggleTranslation();
                }
            });
        },
        
        async fetchSentences() {
            this.loading = true;
            console.log('🔄 Starting to fetch sentences...');
            try {
                // Try API first
                console.log('📡 Fetching from API: /api/lessons/lesson-03/sentences');
                const response = await fetch('/api/lessons/lesson-03/sentences');
                const data = await response.json();
                console.log('📦 API Response:', data);
                this.sentences = data.sentences || data;
                console.log('✅ Loaded sentences from API. Total:', this.sentences.length);
            } catch (error) {
                console.error('❌ Error fetching sentences from API:', error);
                // Fallback to local JSON data
                try {
                    console.log('📡 Trying local fallback: /data/lesson-03/sentences.json');
                    const response = await fetch('/data/lesson-03/sentences.json');
                    const data = await response.json();
                    console.log('📦 Local Response:', data);
                    this.sentences = data.sentences || data;
                    console.log('✅ Loaded sentences from local JSON. Total:', this.sentences.length);
                } catch (localError) {
                    console.error('❌ Error fetching local sentences:', localError);
                }
            } finally {
                this.loading = false;
            }
        },
        
        get filteredSentences() {
            if (this.filterCategory === 'all') {
                return this.sentences;
            }
            return this.sentences.filter(sentence => sentence.category === this.filterCategory);
        },
        
        get categories() {
            const cats = new Set(this.sentences.map(sentence => sentence.category));
            return ['all', ...Array.from(cats)];
        },
        
        selectSentence(sentence) {
            this.currentSentence = sentence;
            console.log('Selected sentence:', sentence);
        },
        
        clearSelection() {
            this.currentSentence = null;
        },
        
        toggleTranslation() {
            this.showTranslation = !this.showTranslation;
            console.log('Translation visibility:', this.showTranslation);
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
        },
        
        getCategoryColor(category) {
            const colors = {
                'greeting': '#FF6B6B',
                'gratitude': '#4ECDC4',
                'introduction': '#45B7D1',
                'question': '#FFA07A',
                'communication': '#98D8C8',
                'request': '#F7DC6F',
                'feeling': '#BB8FCE',
                'daily': '#85C1E2',
                'preference': '#F8B88B',
                'relationship': '#FAA0A0',
                'learning': '#77DD77',
                'polite': '#CFCFC4',
                'farewell': '#FFB347'
            };
            return colors[category] || '#E0E0E0';
        }
    }));
});
