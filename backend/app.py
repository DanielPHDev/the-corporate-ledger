from flask import Flask, jsonify
from flask_cors import CORS
import requests
import csv

app = Flask(__name__)
# O CORS permite que o frontend se comunique livremente com o backend
CORS(app)

@app.route('/')
def home():
    return "API do LayoffIn conectada ao Google Sheets!"

@app.route('/api/layoffs')
def get_layoffs():
    # O seu link oficial do Google Sheets já no formato CSV
    url_planilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgUuff6rCIs4HmwNILXcq5z8hCopNPkq2qeyhiyfvOh11yPOm_5LfvfdMHtNAAJ2xvUWe97fxbTc-B/pub?output=csv"
    
    try:
        # 1. Faz o download do arquivo atualizado no Google
        resposta = requests.get(url_planilha)
        resposta.encoding = 'utf-8' # Evita problemas com acentuação
        
        # 2. Prepara o arquivo para o Python ler linha por linha
        linhas = resposta.text.splitlines()
        leitor_csv = csv.DictReader(linhas)
        
        empresas_formatadas = []
        for index, linha in enumerate(leitor_csv):
            # Trava de segurança: se a linha da planilha estiver vazia, ele pula
            if not linha.get("Empresa") or linha["Empresa"].strip() == "":
                continue
                
            # 3. Monta o cartãozinho do jeito que o React espera
            nova_empresa = {
                "id": index + 1,
                "name": linha["Empresa"].strip(),
                "sector": linha["Setor"].strip(),
                "layoffs": linha["Demissoes"].strip(),
                "icon": linha["Empresa"].strip()[0].upper(), # Pega a 1ª letra para o fallback
                "date": linha["Data"].strip()
            }
            empresas_formatadas.append(nova_empresa)
            
        # 4. Retornamos a lista invertida [::-1] 
        # Assim, a última linha que você adicionar na planilha aparece no TOPO do site!
        return jsonify(empresas_formatadas[::-1])
        
    except Exception as e:
        print("Erro no servidor:", e)
        return jsonify({"erro": "Falha ao ler os dados da planilha"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)