// Nouns Component
// Manages the display and interaction of noun words
// Displays nouns with examples, categories, and audio playback

document.addEventListener('alpine:init', () => {
    Alpine.data('nounsComponent', () => ({
        nouns: [],
        currentNoun: null,
        loading: false,
        filterCategory: 'all',
        
        init() {
            this.fetchNouns();
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentNoun) {
                    this.clearSelection();
                }
            });
        },
        
        async fetchNouns() {
            this.loading = true;
            console.log('🔄 Starting to fetch nouns...');
            try {
                // Try API first
                console.log('📡 Fetching from API: /api/lessons/lesson-02/nouns');
                const response = await fetch('/api/lessons/lesson-02/nouns');
                const data = await response.json();
                console.log('📦 API Response:', data);
                this.nouns = data.nouns || data;
                console.log('✅ Loaded nouns from API. Total:', this.nouns.length);
            } catch (error) {
                console.error('❌ Error fetching nouns from API:', error);
                // Fallback to local JSON data
                try {
                    console.log('📡 Trying local fallback: /data/lesson-02/nouns.json');
                    const response = await fetch('/data/lesson-02/nouns.json');
                    const data = await response.json();
                    console.log('📦 Local Response:', data);
                    this.nouns = data.nouns || data;
                    console.log('✅ Loaded nouns from local JSON. Total:', this.nouns.length);
                } catch (localError) {
                    console.error('❌ Error fetching local nouns:', localError);
                }
            } finally {
                this.loading = false;
            }
        },
        
        get filteredNouns() {
            if (this.filterCategory === 'all') {
                return this.nouns;
            }
            return this.nouns.filter(noun => noun.category === this.filterCategory);
        },
        
        get categories() {
            const cats = new Set(this.nouns.map(noun => noun.category));
            return ['all', ...Array.from(cats)];
        },
        
        selectNoun(noun) {
            this.currentNoun = noun;
            console.log('Selected noun:', noun);
        },
        
        clearSelection() {
            this.currentNoun = null;
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
