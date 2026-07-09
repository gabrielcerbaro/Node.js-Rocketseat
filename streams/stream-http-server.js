// Importa o módulo http para criar um servidor web.
import http from 'node:http';
// Importa a classe Transform para criar uma stream que altera os dados.
import {Transform} from 'node:stream';

// Cria uma stream que transforma cada número recebido em seu oposto.
class InverseNumberStream extends Transform {
    // Método chamado para processar cada pedaço do corpo da requisição.
    _transform(chunk, encoding, callback) {
        // Converte o pedaço para texto, transforma em número e multiplica por -1.
        const transformed = Number(chunk.toString()) * -1

        // Mostra o valor transformado no console.
        console.log(transformed)

        // Envia o valor transformado para a próxima etapa.
        callback(null, Buffer.from(String(transformed)))
    }
}

// Cria um servidor que recebe uma requisição e responde com o mesmo corpo.
const server = http.createServer(async (request, response) => {
    // Array para guardar todos os pedaços do corpo da requisição.
    const buffers = []

    // Percorre a requisição em pedaços.
    for await (const chunk of request) {
        // Adiciona cada pedaço no array.
        buffers.push(chunk)
    }

    // Junta todos os pedaços em uma única string.
    const fullBody = Buffer.concat(buffers).toString()

    // Mostra o corpo completo no console.
    console.log(fullBody)

    // Responde ao cliente com o mesmo conteúdo recebido.
    return response.end(fullBody)
})

// Faz o servidor escutar na porta 3334.
server.listen(3334);