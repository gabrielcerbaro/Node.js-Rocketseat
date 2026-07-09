// Importa os tipos de stream que serão usados: leitura, escrita e transformação.
import { Readable, Writable, Transform } from 'node:stream'

// Cria uma stream de leitura que gera números de 1 até 100.
class OneToHundredStream extends Readable {
    // Começa o contador em 1.
    index = 1

    // Método chamado quando a stream quer emitir dados.
    _read() {
        // Pega o número atual e avança o contador.
        const i = this.index++
        
        // Espera 1 segundo para simular uma emissão lenta.
       setTimeout(() => {

            // Se passou de 100, termina a stream.
            if(i > 100) {
                // Envia o sinal de fim da stream.
                this.push(null)
            } else {
                // Cria um buffer com o número em texto.
                const buf = Buffer.from(String(i))
                // Envia o número para a próxima etapa da pipeline.
                this.push(buf + ' ')
            }

        }, 1000)
    }

}

// Cria uma stream de transformação que inverte o sinal do número.
class InverseNumberStream extends Transform {
    // Método chamado para processar cada pedaço recebido.
    _transform(chunk, encoding, callback) {
        // Converte o chunk para texto, transforma em número e multiplica por -1.
        const transformed = Number(chunk.toString()) * -1
        // Passa o valor transformado para a próxima etapa.
        callback(null, Buffer.from(String(transformed)))
    }
}

// Cria uma stream de escrita que imprime o valor multiplicado por 10.
class MultiplyByTenStream extends Writable {
    // Método chamado para cada pedaço recebido.
    _write(chunk, encoding, callback) {
        // Converte para número, multiplica por 10 e mostra no console.
        console.log(Number(chunk.toString()) * 10)
        // Diz que terminou de processar esse pedaço.
        callback()
    }
}

// Conecta as streams em sequência: gera números, inverte sinais e imprime o resultado.
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
