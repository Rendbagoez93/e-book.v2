// Adjectives Component
// Manages the display and interaction of adjective words
// Displays adjectives with opposites, examples, and audio playback

document.addEventListener('alpine:init', () => {
    Alpine.data('adjectivesComponent', () => ({
        adjectives: [],
        currentAdjective: null,
        loading: false,
        filterCategory: 'all',
        
        init() {
            this.fetchAdjectives();
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentAdjective) {
                    this.clearSelection();
                }
            });
        },
        
        async fetchAdjectives() {
            this.loading = true;
            console.log('🔄 Starting to fetch adjectives...');
            try {
                // Try API first
                console.log('📡 Fetching from API: /api/lessons/lesson-02/adjectives');
                const response = await fetch('/api/lessons/lesson-02/adjectives');
                const data = await response.json();
                console.log('📦 API Response:', data);
                this.adjectives = data.adjectives || data;
                console.log('✅ Loaded adjectives from API. Total:', this.adjectives.length);
            } catch (error) {
                console.error('❌ Error fetching adjectives from API:', error);
                // Fallback to local JSON data
                try {
                    console.log('📡 Trying local fallback: /data/lesson-02/adjectives.json');
                    const response = await fetch('/data/lesson-02/adjectives.json');
                    const data = await response.json();
                    console.log('📦 Local Response:', data);
                    this.adjectives = data.adjectives || data;
                    console.log('✅ Loaded adjectives from local JSON. Total:', this.adjectives.length);
                } catch (localError) {
                    console.error('❌ Error fetching local adjectives:', localError);
                }
            } finally {
                this.loading = false;
            }
        },
        
        get filteredAdjectives() {
            if (this.filterCategory === 'all') {
                return this.adjectives;
            }
            return this.adjectives.filter(adj => adj.category === this.filterCategory);
        },
        
        get categories() {
            const cats = new Set(this.adjectives.map(adj => adj.category));
            return ['all', ...Array.from(cats)];
        },
        
        selectAdjective(adjective) {
            this.currentAdjective = adjective;
            console.log('Selected adjective:', adjective);
        },
        
        clearSelection() {
            this.currentAdjective = null;
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
