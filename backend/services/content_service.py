import json
import os

class ContentService:
    def __init__(self, data_directory):
        self.data_directory = data_directory

    def load_json(self, filename):
        """Load JSON file from data directory"""
        file_path = os.path.join(self.data_directory, filename)
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Data file not found: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)

    def get_letters(self, lesson_id):
        """Get letters data for a specific lesson"""
        return self.load_json(f'{lesson_id}/letters.json')

    def get_numbers(self, lesson_id):
        """Get numbers data for a specific lesson"""
        return self.load_json(f'{lesson_id}/numbers.json')

    def get_colors(self, lesson_id):
        """Get colors data for a specific lesson"""
        return self.load_json(f'{lesson_id}/colors.json')

    def get_lesson_content(self, lesson_id):
        """Get all content for a specific lesson"""
        return {
            'letters': self.get_letters(lesson_id),
            'numbers': self.get_numbers(lesson_id),
            'colors': self.get_colors(lesson_id)
        }

    def get_word_data(self, lesson_id, word_type):
        """Get word data (verbs, nouns, adjectives) for a specific lesson
        
        Args:
            lesson_id: The lesson identifier (e.g., 'lesson-02')
            word_type: The type of words (e.g., 'verbs', 'nouns', 'adjectives')
        
        Returns:
            Dictionary containing the word data
        """
        return self.load_json(f'{lesson_id}/{word_type}.json')
