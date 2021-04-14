# Fusíveis eletrônicos

> Alternações do recurso de tempo do pacote

## O que são fusíveis?

Para um subconjunto de funcionalidade Electron, faz sentido desativar certos recursos para toda uma aplicação.  Por exemplo, 99% dos aplicativos não fazem uso de `ELECTRON_RUN_AS_NODE`, esses aplicativos querem ser capazes de enviar um binário que é incapaz de usar esse recurso.  Também não queremos que os consumidores de Electron construam a Electron de origem, pois isso é um desafio técnico maciço e tem um alto custo de tempo e dinheiro.

Fusíveis são a solução para este problema, em um alto nível são "bits mágicos" no binário Electron que podem ser invertidos ao empacotar seu aplicativo Electron para habilitar / desativar certos recursos / restrições.  Como eles são invertidos na hora do pacote antes de você assinar o seu aplicativo, o SO torna-se responsável por garantir que esses bits não sejam virados para trás via validação de assinatura de código de nível do SISTEMA (Gatekeeper / App Locker).

## Como eu viro os fusíveis?

### A maneira fácil

Fizemos um módulo útil `@electron/fuses` para facilitar a inversão desses fusíveis.  Confira o README desse módulo para obter mais detalhes sobre o uso e possíveis casos de erro.

```js
requer ('@electron/fuses').flipFuses(
  // Caminho para elétrons
  requerem ('elétron'),
  // Fuses para virar
  {
    runAsNode: false
  }
)
```

### Da maneira mais difícil

#### Glossário Rápido

* **Fusível Wire**: Uma sequência de bytes no binário eletrônico usado para controlar os fusíveis
* **Sentinel**: Uma sequência estática conhecida de bytes que você pode usar para localizar o fio de fusível
* **Fusível Schema**: O formato / valores permitidos para o fio de fusível

Virar fusíveis manualmente requer editar o binário Electron e modificar o fio de fusível para ser a sequência de bytes que representam o estado dos fusíveis que você deseja.

Em algum lugar no binário electron haverá uma sequência de bytes que se parecem com este:

```text
| ... | binário sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ... | binário
```

* `sentinel_bytes` é sempre essa `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX`de corda exata
* `fuse_version` é um único byte cujo valor inteiro não assinado representa a versão do esquema de fusíveis
* `fuse_wire_length` é um único byte cujo valor inteiro não assinado representa o número de fusíveis no seguinte fio de fusível
* `fuse_wire` é uma sequência de N bytes, cada byte representa um único fusível e seu estado.
  * "0" (0x30) indica que o fusível está desativado
  * "1" (0x31) indica que o fusível está ativado
  * "r" (0x72) indica que o fusível foi removido e a mudança do byte para 1 ou 0 não terá efeito.

Para virar um fusível você encontra sua posição no fio do fusível e muda-o para "0" ou "1" dependendo do estado que você gostaria.

Você pode ver o esquema atual [aqui](https://github.com/electron/electron/blob/master/build/fuses/fuses.json).
