## Class: Cookies

> Consulte e modifique os cookies de uma sessão.

Processo: [Main](../glossary.md#main-process)

Instâncias da classe `Cookies` são acessadas através da propriedade `cookies` de uma `Sessão`.

Como por exemplo:

```javascript
const { session } = requer ('elétron')

// Consulta de todos os cookies.
session.defaultSession.cookies.get({})
  .then(cookies) => {
    console.log(cookies)
  }).catch((erro) => {
    console.log(erro)
  })

// Consulta de todos os cookies associados a uma url específica.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .(cookies) => {
    console.log(cookies)
  }).catch((erro) => {
    console.log(erro)
  })

// Definir um cookie com os dados de cookies dados do cookie;
// pode substituir cookies equivalentes se existirem.
const cookie = { url: 'http://www.github.com', nome: 'dummy_name', valor: 'manequim' }
session.defaultSession.cookies.set(cookie)
  .((() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### Eventos de instância

Os seguintes eventos estão disponíveis em instâncias de `Cookies`:

#### Evento: 'changed'

Retorna:

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - O cookie que foi modificado.
* `cause` String - A causa da mudança com um dos seguintes valores:
  * `explicit` - O cookie foi modificado diretamente por uma ação do consumidor.
  * `overwrite` - O cookie foi removido automaticamente devido à uma ação de inserção que o sobrescreveu.
  * `expired` - O cookie foi automaticamente removido conforme expirou.
  * `evicted` - O biscoito foi automaticamente despejado durante a coleta de lixo.
  * `expired-overwrite` - O cookie foi substituído com uma data de validade já expirada.
* `removed` Boolean - `true` se o cookie foi removido, `false` caso contrário.

Emitido quando um cookie é modificado devido à adição, edição, remoção ou expiração.

### Métodos de Instância

Os metódos a seguir estão disponíveis em instâncias `de Cookies`:

#### `cookies.get (filtro)`

* objeto `filter`
  * `url` String (opcional) - Recupera cookies associados a `url`. Vazio implica recuperar cookies de todos os URLs.
  * `name` String (opcional) - Filtra cookies por nome.
  * `domain` String (opcional) - Recupera cookies nos quais os domínios sejam iguais ou subdomínios de `domain`.
  * `path` String (opcional) - Recupera cookies nos quais o caminho seja igual a `path`.
  * `secure` Boolean (opcional) - Filtra cookies pela propriedade Secure.
  * `session` Boolean (opcional) - Filtra a sessão ou os cookies persistentes.

Devoluções `Promise<Cookie[]>` - Uma promessa que resolve uma variedade de objetos de cookies.

Envia uma solicitação para obter todos os cookies correspondentes `filter`, e resolve uma promessa com a resposta.

#### `cookies.set(detalhes)`

* objeto `details`
  * `url` String - A URL para associar o cookie. A promessa será rejeitada se a URL for inválida.
  * `name` String (opcional) - O nome do cookie. Esvazie por padrão se omitir.
  * `value` String (opcional) - O valor do cookie. Esvazie por padrão se omitir.
  * `domain` String (opcional) - O domínio do cookie; isto será normalizado com um ponto no início para que ele também seja válido para subdomínios. Esvazie por padrão se omitir.
  * `path` String (opcional) - O Diretório do cookie. Esvazie por padrão se omitir.
  * `secure` Boolean (opcional) - Se o cookie deve ser marcado como Seguro. Padrão sendo false.
  * `httpOnly` Boolean (opcional) - Se o cookie deve ser marcado apenas como HTTP. Padrão para falso.
  * `expirationDate` Double (opcional) - A data de validade do cookie como o número de segundos desde a época UNIX. Se omitido, o cookie se torna uma sessão cookie e não será retido entre as sessões.
  * `sameSite` String (opcional) - A política de [Mesmo Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) se aplicar a este cookie.  Pode ser `unspecified`, `no_restriction`, `lax` ou `strict`.  O padrão é `no_restriction`.

Devoluções `Promise<void>` - Uma promessa que se resolve quando o cookie foi definido

Define um cookie com `details`.

#### `cookies.remove (url, nome)`

* `url` String - A URL associada com o cookie.
* `name` String - O nome do cookie a ser removido.

Devoluções `Promise<void>` - Uma promessa que se resolve quando o cookie foi removido

Remove os cookies que combinam `url` e `name`

#### `cookies.flushStore()`

Devoluções `Promise<void>` - Uma promessa que se resolve quando a loja de biscoitos foi lavada

Escreve qualquer cookie que não tenha sido escrito no disco.
