// Importa a classe Readable do módulo de streams do Node.js.
import {Readable} from 'node:stream';

// Cria uma stream personalizada que vai gerar números de 1 até 5.
class OneToHundredStream extends Readable {
    // Começa o contador no valor 1.
    index = 1

    // Método que é chamado sempre que a stream precisa produzir dados.
    _read() {
        // Pega o valor atual e já aumenta o contador para o próximo número.
        const i = this.index++
        
        // Espera 1 segundo antes de mandar o próximo dado.
       setTimeout(() => {

            // Se já passou de 5, termina a stream.
            if(i > 5) {
                // Envia o sinal de fim da stream.
                this.push(null)
            } else {
                // Cria um buffer com o número atual em texto.
                const buf = Buffer.from(String(i))
                // Envia esse número para a stream.
                this.push(buf)
            }

        }, 1000)
    }

}

// Faz uma requisição HTTP para o servidor local enviando a stream como corpo.
fetch('http://localhost:3334', {
    // Define o método como POST.
    method: 'POST',
    // Envia a stream como corpo da requisição.
    body: new OneToHundredStream(),
    // Necessário para indicar que a requisição terá um corpo em stream.
    duplex: 'half'
}).then(response => {
    // Lê a resposta do servidor como texto.
    return response.text()
}).then(data => {
    // Mostra o que o servidor respondeu.
    console.log(data)
})