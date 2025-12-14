from flask import Blueprint, jsonify
from backend.services.content_service import ContentService
import os

lessons_bp = Blueprint('lessons', __name__)

# Initialize content service with correct path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, 'src', 'data')
content_service = ContentService(DATA_DIR)

@lessons_bp.route('/lessons/lesson-01', methods=['GET'])
def get_lesson_01():
    """Get all content for lesson 01"""
    try:
        content = content_service.get_lesson_content('lesson-01')
        return jsonify(content), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lessons_bp.route('/lessons/lesson-01/letters', methods=['GET'])
def get_letters():
    """Get letters data"""
    try:
        letters = content_service.get_letters('lesson-01')
        return jsonify(letters), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lessons_bp.route('/lessons/lesson-01/numbers', methods=['GET'])
def get_numbers():
    """Get numbers data"""
    try:
        numbers = content_service.get_numbers('lesson-01')
        return jsonify(numbers), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lessons_bp.route('/lessons/lesson-01/colors', methods=['GET'])
def get_colors():
    """Get colors data"""
    try:
        colors = content_service.get_colors('lesson-01')
        return jsonify(colors), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500