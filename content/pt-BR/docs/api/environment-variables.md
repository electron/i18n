# Variáveis de Ambiente

> Controle configurações e comportamento de aplicações sem mudar o código.

Certos comportamentos do Electron são controlados por variáveis de ambientes porque são inicializados antes que as flags da linha de comando e o código da aplicação.

Exemplo de shell POSIX:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Exemplo de console do Windows:

```powershell
> conjunto ELECTRON_ENABLE_LOGGING=elétron
> verdadeiro
```

## Variáveis de Produção

As seguintes variáveis de ambiente destinam-se principalmente ao uso em tempo de execução em aplicações eletrônicas embaladas.

### `NODE_OPTIONS`

O elétron inclui suporte para um subconjunto de [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options)do Node. A maioria é apoiada, com exceção daqueles que conflitam com o uso do BoringSSL pelo Chromium.

Exemplo:

```sh
exportar NODE_OPTIONS="---sem-avisos -max-old-space-size=2048"
```

As opções sem suporte são:

```sh
--use-bundled-ca
--force-fips
--habilitar-fips
--abresl-config
--use-openssl-ca
```

`NODE_OPTIONS` são explicitamente proibidos em aplicativos embalados, exceto pelo seguinte:

```sh
-max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

O suporte à geolocalização na Electron requer o uso do serviço web de geolocalização do Google Cloud Platform. Para habilitar esse recurso, adquira uma [a chave API do Google](https://developers.google.com/maps/documentation/geolocation/get-api-key) e coloque o seguinte código em seu arquivo principal de processo, antes de abrir qualquer janelas do navegador que farão solicitações de geolocalização:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

Por padrão, uma tecla de API do Google recém-gerada pode não ser permitida para fazer solicitações de geolocalização. Para habilitar o webservice de geolocalização para o seu projeto, habilite-o através da biblioteca de API [](https://console.cloud.google.com/apis/library).

N.b. Você precisará adicionar uma [Conta de Faturamento](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) ao projeto associado à chave de API para que o webservice de geolocalização funcione.

### `ELECTRON_NO_ASAR`

Desabilita o suporte ASAR. Essa variável só é suportada em processos infantis bifurcados e gerou processos infantis que estabelecem `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Inicia o processo como um processo .js Nó normal.

Neste modo, você poderá passar [opções cli](https://nodejs.org/api/cli.html) para Node.js como que você faria ao executar o Nó normal.js executável, com exceção das seguintes bandeiras:

* "-abre-config"
* "-use-bundled-ca"
* "-use-openssl-ca",
* "-fíbula-fips"
* "-habilitar-fips"

Essas bandeiras são desativadas devido ao fato de que a Electron usa BoringSSL em vez de OpenSSL ao construir o módulo `crypto` do Node.js e, portanto, não funcionará como projetado.

### `ELECTRON_NO_ATTACH_CONSOLE` __do Windows

Não se conecte à sessão atual do console.

### </em>Linux `ELECTRON_FORCE_WINDOW_MENU_BAR` _</h3>

Não use a barra de menu global no Linux.

### </em>Linux `ELECTRON_TRASH` _</h3>

Defina a implementação do lixo no Linux. O padrão é `gio`.

Opções:

* `gvfs-lixo`
* `lixo cli`
* `kioclient5`
* `kioclient`

## Variáveis de desenvolvimento

As seguintes variáveis de ambiente são destinadas principalmente para fins de depuração e desenvolvimento.

### `ELECTRON_ENABLE_LOGGING`

Imprime o log interno do Chrome para o console.

### `ELECTRON_LOG_ASAR_READS`

Quando o Electron ler a partir de um arquivo ASAR, registre o deslocamento de leitura e o caminho do arquivo para o sistema `tmpdir`. O arquivo resultante pode ser fornecido ao módulo ASAR para otimizar o pedido de arquivos.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime o rastreamento da pilha para o console quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.

### `ELECTRON_DEFAULT_ERROR_MODE` __do Windows

Mostra a caixa de diálogo de travamento do Windows quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.

### `ELECTRON_OVERRIDE_DIST_PATH`

Ao correr do pacote `electron` , esta variável diz o comando `electron` usar a compilação especificada da Electron em vez de a baixada por `npm install`. Usando:

```sh
exportar ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

## Definido por elétron

Elétron define algumas variáveis em seu ambiente em tempo de execução.

### `ORIGINAL_XDG_CURRENT_DESKTOP`

Esta variável é definida para o valor de `XDG_CURRENT_DESKTOP` com a originalmente lançada.  O elétron às vezes modifica o valor da `XDG_CURRENT_DESKTOP` para afetar outra lógica dentro do Cromo, então se você quiser acesso ao _valor original de_ você deve procurar essa variável de ambiente em vez disso.
