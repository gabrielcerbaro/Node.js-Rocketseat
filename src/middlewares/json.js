// Exporta uma função assíncrona chamada json para ler o corpo da requisição.
export async function json(request, response) {

    // Cria um array para guardar os pedaços do corpo da requisição.
    const buffers = []

    // Percorre o fluxo de dados da requisição em pedaços.
    for await (const chunk of request) {
        // Adiciona cada pedaço ao array.
        buffers.push(chunk)
    }

    // Tenta transformar o conteúdo recebido em um objeto JavaScript.
    try {
        // Junta todos os pedaços, converte para texto e transforma em JSON.
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    // Se der erro, cai aqui.
    }catch {
        // Coloca null no corpo para indicar que não conseguiu ler.
        request.body = null
    }
}