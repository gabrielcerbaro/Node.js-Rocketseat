// Importa o módulo http do Node.js para criar um servidor web.
import http from 'node:http'
// Importa a função randomUUID para gerar um identificador único para cada usuário.
import { randomUUID } from 'node:crypto'
// Importa a classe Database do arquivo database.js para guardar os dados.
import { Database } from './database.js'
// Importa a função json do middleware para transformar o corpo da requisição em objeto.
import { json } from './middlewares/json.js'

// Cria um objeto da classe Database para usar como banco de dados simples.
const database = new Database()

// Cria um servidor HTTP que vai responder às requisições recebidas.
const server = http.createServer(async (request, response) => {
    // Pega o método da requisição, como GET ou POST, e a URL pedida.
    const {method, url} = request

    // Chama o middleware json para ler e converter o corpo da requisição.
    await json(request, response)

    // Verifica se a requisição é GET e se a rota é /users.
    if(method === 'GET' && url === '/users') {
        // Busca todos os usuários da tabela users no banco de dados.
        const users = database.select('users')

        // Retorna uma resposta com os dados em formato JSON.
        return response
        // Define o tipo de conteúdo como JSON.
        .setHeader('Content-type', 'application/json')
        // Envia os usuários convertidos em texto para o cliente.
        .end(JSON.stringify(users))
    }

    // Verifica se a requisição é POST e se a rota é /users.
    if(method === 'POST' && url === '/users') {

        // Pega o nome e o email que vieram no corpo da requisição.
        const {name, email} = request.body

        // Cria um objeto representando o novo usuário.
        const user = {
            // Define o id do usuário usando um valor único gerado automaticamente.
            id: randomUUID(),
            // Define o nome do usuário com o valor recebido.
            nome: name,
            // Define o email do usuário com o valor recebido.
            email: email
        }
        
        // Insere o usuário na tabela users do banco de dados.
        database.insert('users', user)

        // Envia uma resposta de sucesso com status 201, indicando que foi criado.
        return response.writeHead(201).end()
    }

    // Se nenhuma rota for encontrada, responde com erro 404.
    return response.writeHead(404).end()
})

// Faz o servidor ficar escutando na porta 3333.
server.listen(3333);
