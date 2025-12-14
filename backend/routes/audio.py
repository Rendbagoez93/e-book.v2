from flask import Blueprint, jsonify, request, send_file
from backend.services.audio_service import AudioService
import os

audio_bp = Blueprint('audio', __name__)

# Initialize audio service
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
AUDIO_DIR = os.path.join(BASE_DIR, 'src', 'assets', 'audio')
audio_service = AudioService(AUDIO_DIR)

@audio_bp.route('/audio/generate', methods=['GET'])
def generate_audio():
    """
    Generate audio from text using gTTS
    Query params:
        - text: Text to convert to speech
        - lang: Language code (default: 'en')
    """
    try:
        text = request.args.get('text')
        lang = request.args.get('lang', 'en')
        
        if not text:
            return jsonify({'error': 'Text parameter is required'}), 400
        
        # Generate audio file
        filename = audio_service.text_to_speech(text, lang)
        
        return jsonify({
            'success': True,
            'audio_url': f'/assets/audio/{filename}',
            'text': text
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@audio_bp.route('/audio/file/<filename>', methods=['GET'])
def get_audio_file(filename):
    """Serve audio file"""
    try:
        filepath = audio_service.get_audio_path(filename)
        if os.path.exists(filepath):
            return send_file(filepath, mimetype='audio/mpeg')
        else:
            return jsonify({'error': 'Audio file not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@audio_bp.route('/audio/clear-cache', methods=['POST'])
def clear_audio_cache():
    """Clear old audio files from cache"""
    try:
        days = request.json.get('days', 7) if request.json else 7
        audio_service.clear_old_audio_files(days)
        return jsonify({'success': True, 'message': f'Cleared audio files older than {days} days'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
