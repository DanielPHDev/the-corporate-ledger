from flask import Flask, jsonify
from flask_cors import CORS
import requests # <- Essa é a nova ferramenta mágica!

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "API do The Corporate Ledger rodando!"

@app.route('/api/layoffs')
def get_layoffs():
    # 1. O Python vai "acessar" essa URL na internet
    # (No futuro, você pode trocar essa URL por uma API real de notícias ou um GitHub público com CSVs de demissões)
    url_dos_dados = "https://raw.githubusercontent.com/danielphdev/mock-data/main/layoffs.json"
    
    try:
        # 2. Fazendo o pedido para a internet
        resposta = requests.get('https://jsonplaceholder.typicode.com/users')
        dados_da_internet = resposta.json()
        
        # 3. Como os dados da internet vêm de outro formato, nós "traduzimos" 
        # para o formato exato que o seu React (os cartões) está esperando.
        empresas_formatadas = []
        for index, usuario in enumerate(dados_da_internet[:6]): # Pegando os 6 primeiros
            nova_empresa = {
                "id": usuario["id"],
                "name": usuario["company"]["name"], # Pega o nome da empresa fictícia
                "sector": usuario["company"]["catchPhrase"],
                "layoffs": str((index + 1) * 1500), # Inventando um número para testar
                "icon": usuario["company"]["name"][0] # Pega a primeira letra
            }
            empresas_formatadas.append(nova_empresa)
            
        return jsonify(empresas_formatadas)
        
    except Exception as e:
        # Se a internet falhar ou a API estiver fora do ar, ele avisa o erro
        return jsonify({"erro": "Não foi possível buscar os dados da internet"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)