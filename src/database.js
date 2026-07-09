// Importa a função de leitura e escrita de arquivos do Node.js.
import fs from 'node:fs/promises'

// Define o caminho do arquivo JSON que vai armazenar os dados do banco.
const databasePath = new URL('../db.json', import.meta.url)

// Exporta a classe Database para poder usar em outros arquivos.
export class Database {
    // Cria um atributo privado para guardar os dados internamente sem expor diretamente.
    #database = {}

    // Construtor: é executado quando a classe é criada.
    constructor() {
        // Tenta ler o arquivo do banco de dados existente.
        fs.readFile(databasePath, 'utf-8')
        .then(data => {
            // Se o arquivo existir, transforma o conteúdo em objeto e salva no banco interno.
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            // Se der erro, cria o arquivo do banco com os dados atuais.
            this.#persist()
        })
    }

    // Método privado que salva os dados atuais no arquivo JSON.
    #persist() {
        // Escreve o conteúdo do banco no arquivo db.json.
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    // Método para buscar os dados de uma tabela.
    select(table) {
        // Pega os dados da tabela pedida ou um array vazio se não existir.
        const data = this.#database[table] ?? []
        // Retorna os dados encontrados.
        return data
    }

    // Método para inserir um novo dado em uma tabela.
    insert(table, data) {
        // Verifica se a tabela já existe e já é um array.
        if(Array.isArray(this.#database[table])) {
            // Se existir, adiciona o novo dado no fim do array.
            this.#database[table].push(data)
        } else {
            // Se não existir, cria a tabela como um array com o primeiro item.
            this.#database[table] = [data]
        }
        
        // Salva imediatamente os dados alterados no arquivo JSON.
        this.#persist()

        // Retorna o dado que foi inserido.
        return data
    }

}