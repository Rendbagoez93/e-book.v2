from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, 
            static_folder='../src',
            static_url_path='')

# Enable CORS for frontend-backend communication
CORS(app)

# Import and register blueprints
from backend.routes.lessons import lessons_bp
from backend.routes.audio import audio_bp

app.register_blueprint(lessons_bp, url_prefix='/api')
app.register_blueprint(audio_bp, url_prefix='/api')

# Serve the main index page
@app.route('/')
def index():
    return send_from_directory(os.path.join(app.static_folder, 'html'), 'index.html')

# Serve lesson pages
@app.route('/lessons/<path:filename>')
def serve_lessons(filename):
    return send_from_directory(os.path.join(app.static_folder, 'html', 'lessons'), filename)

# Serve CSS files
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(app.static_folder, 'css'), filename)

# Serve JS files
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(app.static_folder, 'js'), filename)

@app.route('/js/components/<path:filename>')
def serve_js_components(filename):
    return send_from_directory(os.path.join(app.static_folder, 'js', 'components'), filename)

# Serve data files
@app.route('/data/<path:filename>')
def serve_data(filename):
    return send_from_directory(os.path.join(app.static_folder, 'data'), filename)

# Serve assets
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.static_folder, 'assets'), filename)

# Catch-all route for other static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)