// import: palavra usada para trazer codigo de outro arquivo/modulo para este arquivo.
// http: nome que escolhemos para guardar o modulo importado.
// from: indica de onde esse modulo vem.
// 'node:http': modulo interno do Node.js para criar servidores HTTP.
// HTTP e o protocolo usado por navegadores e APIs para conversar pela internet.
import http from 'node:http'

// const: cria uma constante, ou seja, uma variavel que nao sera reatribuida.
// server: nome da constante. Ela vai guardar o servidor criado pelo Node.js.
// =: coloca o resultado do lado direito dentro da constante do lado esquerdo.
// http.createServer: funcao do modulo http que cria um servidor web.
// request: objeto com informacoes da requisicao que chegou ao servidor.
// Exemplo: rota acessada, metodo HTTP, headers e outros dados enviados pelo cliente.
// response: objeto usado para enviar uma resposta de volta para quem fez a requisicao.
// =>: cria uma arrow function, um tipo moderno de funcao em JavaScript.
// Essa funcao e chamada toda vez que alguem acessa o servidor.
const server = http.createServer((request, response) => {
    // return: encerra a execucao desta funcao e devolve um resultado.
    // response.end: finaliza a resposta HTTP enviada ao cliente.
    // "Hello World": texto enviado como resposta para o navegador/API.
    return response.end("Hello World")
})

// server.listen: manda o servidor ficar "ouvindo" uma porta.
// 3333: numero da porta. A porta e como uma entrada especifica do computador.
// Com o servidor rodando, voce pode acessar http://localhost:3333 no navegador.
server.listen(3333);
