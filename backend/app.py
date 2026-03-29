from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
# O CORS permite que nosso frontend converse com nosso backend sem bloqueios de segurança
CORS(app)

@app.route('/')
def home():
    return "API do The Corporate Ledger rodando!"

@app.route('/api/layoffs')
def get_layoffs():
    # Lê o arquivo JSON e envia para quem pedir
    with open('data.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)