# Construir Resumo do Sistema

A Electron usa [](https://gn.googlesource.com/gn) GN para geração de projetos e</a> ninjapara construção. As configurações do projeto podem ser encontradas nos arquivos `.gn` e `.gni` .</p> 



## Arquivos GN

Os seguintes arquivos `gn` contêm as principais regras para a construção de Elétrons:

* `BUILD.gn` define como a própria Electron é construída e inclui as configurações padrão para vincular com o Cromo.

* `build/args/{debug,release,all}.gn` contêm os argumentos padrão de construção para construção de Elétrons.



## Compilação de componentes

Como o Cromo é um projeto bastante grande, a fase final de ligação pode levar alguns minutos, o que dificulta o desenvolvimento. Para resolver isso, o Chromium introduziu a "compilação de componentes", que constrói cada componente como uma biblioteca compartilhada separada, tornando a vinculação muito rápida, mas sacrificando o tamanho do arquivo e desempenho.

Elétron herda esta opção de construção do Cromo. Em `Debug` compilações, o binário será vinculado a uma versão de biblioteca compartilhada dos componentes do Chromium para alcançar um tempo de ligação rápido; para `Release` construções, o binário estará ligado a versões estáticas da biblioteca, para que possamos ter o melhor tamanho binário possível e desempenho .



## Testes

**NB** _esta seção está desatualizada e contém informações que não são mais relevantes para o elétron construído em GN._

Teste suas modificações de acordo com o projeto, usando o estilo de codificação:



```sh
$ npm run lint
```


Teste a funcionalidade usando:



```sh
$ npm test
```


Sempre que fizer alterações no seu código Electron, terá de reconstruir antes de rodar os testes:



```sh
$ npm run build && npm test
```


Você pode fazer com que a suíte de teste seja executada mais rapidamente isolando o teste específico ou bloquear que você está trabalhando atualmente usando os testes exclusivos [da Mocha](https://mochajs.org/#exclusive-tests) recurso. Anexar `.only` a qualquer chamada de função `describe` ou `it` :



```js
descrever.only ('algum recurso', () => {
  // ... apenas testes neste bloco serão executados
})
```


Alternativamente, você pode usar a opção `grep` do mocha para executar apenas testes que correspondam ao dado o padrão de expressão regular:



```sh
$ npm test -- --grep child_process
```


Testes que incluem módulos nativos (por exemplo. `runas`) não pode ser executado com a construção de depuração de (veja [#2558](https://github.com/electron/electron/issues/2558) para detalhes), mas eles trabalharão com a construção de lançamento.

Para executar os testes com o uso de compilação de versão:



```sh
$ npm test -- -R
```
