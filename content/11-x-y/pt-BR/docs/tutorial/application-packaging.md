# Empacotamento de Aplicativos

Para evitar [problemas](https://github.com/joyent/node/issues/6960) por causa de nomes longos de caminhos no Windows, melhorar a velocidade do `require` e ocultar seu código-fonte a partir de uma inspeção superficial, você pode optar por empacotar seu aplicativo em um pacote [asar][asar] com pequenas alterações no seu código-fonte.

Esse recurso é gratuito para a maioria dos usuários, já que ele é compatível com o uso do [`electron-packager`][electron-packager],[`electron-forge`][electron-forge] e [`electron-builder`][electron-builder]. Se você não utiliza nenhuma dessas ferramentas, continue lendo.

## Gerando Arquivos `asar`

Um arquivo [asar][asar] tem um formato simples, ele se assemelha ao tar, que concatena vários arquivos em um único arquivo. O Electron pode ler arquivos de forma independente, ou seja, sem descompactar o arquivo inteiro.

Passos para empacotar seu app em um pacote `asar`:

### 1. Instale o asar

```sh
$ npm install -g asar
```

### 2. Empacote com o `asar pack`

```sh
$ asar pack your-app app.asar
```

## Usando arquivos `asar`

No Electron existem dois conjuntos de APIs: APIs do Node fornecidas por Node.js e APIs da Web e da Web fornecidos pelo Chromium. Ambos os APIs suportam a leitura de arquivos dos arquivos do `asar`.

### API Node

Com caminhos especiais no Electron, APIs Node como `fs.readFile` e `require` tratam pacotes `asar` como diretórios virtuais, e os arquivos dentro deles como arquivos normais do sistema.

Por exemplo, supondo que nós temos um pacote `exemple.asar` em `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Para ler um arquivo no pacote `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Para listar todos os arquivos dentro da raiz do pacote:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Para usar um módulo existente no pacote:

```javascript
require('./caminho/para/exemplo.asar/dir/module.js')
```

Você também pode mostrar uma página Web em um pacote `asar` com o `BrowserWindows`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### API Web

Em uma página da Web, arquivos em um arquivo podem ser solicitados com o `arquivo` protocolo. Como a Node API, os arquivos `asar` são tratados como diretórios.

Por exemplo, para obter um arquivo com `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Tratando um pacote `asar` como um Arquivo Normal

Às vezes, é necessário fazer uma verificações de checksum no pacote `asar`, então nós precisamos ler o conteúdo de um pacote `asar` como um arquivo. Para isso, você pode usar o módulo built-in `original-fs` que fornece a API `fs` original sem dependência do `asar`:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Ou você pode setar o `process.noAsar` para `true` para desativar a dependência para o `asar` no módulo `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Limitações da API Node

Apesar de termos tentado fazer o pacotes `asar` na API Node se comportarem como diretórios o máximo possível, existem ainda limitações devido a natureza de baixo nível da API Node.

### Pacotes são Somente Leitura

Os pacotes não podem ser modificados. Logo, nenhuma das APIs do Node que permitem modificar arquivos funcionará com pacotes `asar`.

### Diretórios de trabalho não pode ser setado como diretórios no pacote

Como os pacotes `asar` são tratados como diretórios, não há nenhum diretório real nos arquivos de sistema, então você nunca poderá definir um diretório de trabalho como diretório nos pacotes `asar`. Ao informar a opção `cwd` algumas APIs podem apresentar erros.

### Desempacotando em Algumas APIs

Maioria das APIs do `fs` podem ler um arquivo ou buscar informações de arquivos a partir dos arquivos do tipo `asar` sem necessariamente descompactar o arquivo. Electron irá extrair os arquivos necessários dentro de um arquivo temporário e passar o caminho do(s) arquivo(s) temporário(s) para algum(as) APIs funcionem. A seguir algumas informações sobre essas APIs.

As APIs que necessitam descompactar alguns arquivos extras são:

* `filho_processo.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Utilizado com `require` em módulos nativos

### Informação estática falsa em `fs.stat`

O objeto de `Stats` retornado por `fs. tat` e seus amigos em arquivos em `asar` arquivos é gerado por adivinhação, porque esses arquivos não existem no sistema de arquivos . Então você não deve confiar no objeto `Stats` , exceto para obter tamanho do arquivo e verificar o tipo de arquivo.

### Executando binários dentro do `asar` Archive

Existem APIs do Node que podem executar binários como `child_process.exec`, `child_process.spawn` e `child_process. xecFile`, mas apenas `execFile` é com suporte para executar binários dentro de `asar` arquivo.

Isso porque `exec` e `spawn` aceitam o comando `` em vez do `arquivo` como entrada, O comando e ``s são executados sob o shell. Não há uma forma confiável de determinar se um comando usa um arquivo no arquivo do asar, e mesmo que o façamos, nós não podemos ter certeza se podemos substituir o caminho no comando sem efeitos colaterais.

## Adicionando Arquivos Descompactados para `asar` Arquivos

Como mencionado acima, algumas APIs do Node descompactarão o arquivo para o sistema de arquivos quando for chamado. Além dos problemas de desempenho, vários scanners antivírus podem ser acionados por este comportamento.

Como uma alternativa, você pode deixar vários arquivos descompactados usando a opção `--unpack`. No exemplo a seguir, bibliotecas compartilhadas dos módulos nativos do Node.js não serão empacotadas:

```sh
$ asar pack app app.asar --unpack *.node
```

Depois de executar o comando, você notará que uma pasta chamada `app.asar.unpacked` foi criada junto com o arquivo `app.asar`. Ele contém os arquivos não empacotados e deve ser enviado junto com o `arquivo app.asar`.

[asar]: https://github.com/electron/asar
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder

