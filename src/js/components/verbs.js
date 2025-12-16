// Verbs Component
// Manages the display and interaction of verb words
// Displays verbs with examples, categories, and audio playback

document.addEventListener('alpine:init', () => {
    Alpine.data('verbsComponent', () => ({
        verbs: [],
        currentVerb: null,
        loading: false,
        filterCategory: 'all',
        
        init() {
            this.fetchVerbs();
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentVerb) {
                    this.clearSelection();
                }
            });
        },
        
        async fetchVerbs() {
            this.loading = true;
            console.log('🔄 Starting to fetch verbs...');
            try {
                // Try API first
                console.log('📡 Fetching from API: /api/lessons/lesson-02/verbs');
                const response = await fetch('/api/lessons/lesson-02/verbs');
                const data = await response.json();
                console.log('📦 API Response:', data);
                this.verbs = data.verbs || data;
                console.log('✅ Loaded verbs from API. Total:', this.verbs.length);
            } catch (error) {
                console.error('❌ Error fetching verbs from API:', error);
                // Fallback to local JSON data
                try {
                    console.log('📡 Trying local fallback: /data/lesson-02/verbs.json');
                    const response = await fetch('/data/lesson-02/verbs.json');
                    const data = await response.json();
                    console.log('📦 Local Response:', data);
                    this.verbs = data.verbs || data;
                    console.log('✅ Loaded verbs from local JSON. Total:', this.verbs.length);
                } catch (localError) {
                    console.error('❌ Error fetching local verbs:', localError);
                }
            } finally {
                this.loading = false;
            }
        },
        
        get filteredVerbs() {
            if (this.filterCategory === 'all') {
                return this.verbs;
            }
            return this.verbs.filter(verb => verb.category === this.filterCategory);
        },
        
        get categories() {
            const cats = new Set(this.verbs.map(verb => verb.category));
            return ['all', ...Array.from(cats)];
        },
        
        selectVerb(verb) {
            this.currentVerb = verb;
            console.log('Selected verb:', verb);
        },
        
        clearSelection() {
            this.currentVerb = null;
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
