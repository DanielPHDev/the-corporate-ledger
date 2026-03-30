from flask import Flask, jsonify
from flask_cors import CORS
import requests
import csv

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "API do LayoffIn conectada a dados reais da comunidade!"

@app.route('/api/layoffs')
def get_layoffs():
    # Esse é um arquivo público real no GitHub de um analista de dados 
    # que contém uma extração dos dados originais de demissões
    url_csv = "https://raw.githubusercontent.com/AlexTheAnalyst/MySQL-YouTube-Series/main/layoffs.csv"
    
    try:
        # 1. O Python vai baixar o arquivo de texto bruto
        resposta = requests.get(url_csv)
        resposta.encoding = 'utf-8'
        
        # 2. Transformamos o texto em um leitor de tabela
        linhas = resposta.text.splitlines()
        leitor_csv = csv.DictReader(linhas)
        
        empresas_formatadas = []
        contador = 1
        
        # 3. Passamos linha por linha do arquivo do analista
        for linha in leitor_csv:
            # Pula as empresas que não divulgaram o número exato (NULL ou vazio)
            if linha["total_laid_off"] == "NULL" or not linha["total_laid_off"]:
                continue
                
            # Cria a caixinha do jeito que o nosso React está esperando
            nova_empresa = {
                "id": contador,
                "name": linha["company"],
                "sector": linha["industry"],
                "layoffs": linha["total_laid_off"],
                "icon": linha["company"][0].upper() if linha["company"] else "🏢",
                "date": linha["date"],
            }
            empresas_formatadas.append(nova_empresa)
            contador += 1
            
            # Pegamos apenas as 30 primeiras para formar 5 linhas perfeitas de 6 cartões
            if contador > 30:
                break
                
        return jsonify(empresas_formatadas)
        
    except Exception as e:
        print("Erro:", e)
        return jsonify({"erro": "Falha ao buscar dados no servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)