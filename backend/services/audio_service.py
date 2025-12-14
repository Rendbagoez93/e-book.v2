from gtts import gTTS
import os
import hashlib
from datetime import datetime

class AudioService:
    def __init__(self, audio_directory):
        self.audio_directory = audio_directory
        # Create audio directory if it doesn't exist
        os.makedirs(audio_directory, exist_ok=True)

    def generate_audio_filename(self, text):
        """Generate a unique filename based on text hash"""
        text_hash = hashlib.md5(text.lower().encode()).hexdigest()
        return f"audio_{text_hash}.mp3"

    def text_to_speech(self, text, lang='en'):
        """
        Convert text to speech and save as MP3 file
        
        Args:
            text (str): Text to convert to speech
            lang (str): Language code (default: 'en' for English)
            
        Returns:
            str: Path to the generated audio file
        """
        try:
            filename = self.generate_audio_filename(text)
            filepath = os.path.join(self.audio_directory, filename)
            
            # Check if file already exists (cache)
            if os.path.exists(filepath):
                return filename
            
            # Generate speech
            tts = gTTS(text=text, lang=lang, slow=False)
            tts.save(filepath)
            
            return filename
        except Exception as e:
            raise Exception(f"Error generating audio: {str(e)}")

    def get_audio_path(self, filename):
        """Get full path to audio file"""
        return os.path.join(self.audio_directory, filename)

    def clear_old_audio_files(self, days=7):
        """
        Clear audio files older than specified days
        
        Args:
            days (int): Number of days to keep files
        """
        current_time = datetime.now().timestamp()
        for filename in os.listdir(self.audio_directory):
            filepath = os.path.join(self.audio_directory, filename)
            if os.path.isfile(filepath):
                file_age = current_time - os.path.getmtime(filepath)
                if file_age > days * 86400:  # 86400 seconds in a day
                    os.remove(filepath)
