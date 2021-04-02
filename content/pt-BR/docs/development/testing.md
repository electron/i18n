# Testando

Nosso objetivo é manter a cobertura de código de Elétrons alta. Pedimos que todos os puxem solicitação não só passar em todos os testes existentes, mas também adicionar novos testes para cobrir código alterado e novos cenários. Garantir que capturamos muitos caminhos de código e usarmos casos de Electron o mais possível garante que todos os aplicativos de envio com menos bugs.

Este repositório vem com regras de lint de linting tanto para JavaScript quanto C++ – bem como testes de unidade e integração. Para saber mais sobre o estilo de codificação da Electron, consulte o documento</a> estilo
de codificação.</p> 



## Linting

Para garantir que seu JavaScript esteja em conformidade com o estilo de de codificação Eletrônica, execute `npm run lint-js`, que será executado `standard` contra o próprio Electron, bem como os testes da unidade. Se você estiver usando um editor com um sistema plugin/addon, você pode querer usar um dos muitos addons [StandardJS][standard-addons] ser informado sobre violações de estilo de codificação antes de cometê-los.

Para executar `standard` com parâmetros, execute `npm run lint-js --` seguido de argumentos que você quer passado para `standard`.

Para garantir que seu C++ esteja em conformidade com o estilo de codificação Electron, executar `npm run lint-cpp`, que executa um script `cpplint` . Recomendamos que você use `clang-format` e prepare [um pequeno tutorial](clang-format.md).

Não há muito Python neste repositório, mas ele também é governado por regras de estilo de codificação. `npm run lint-py` verificará todas as Python, usando `pylint` para fazê-lo.



## Testes Unitários

Se você não estiver usando [](https://github.com/electron/build-tools)de ferramentas de compilação, garantir que esse nome configurado para sua construção local de Electron seja um dos `Testing`, `Release`, `Default`, `Debug`ou que você tenha definido `process.env.ELECTRON_OUT_DIR`. Sem este conjunto, a Electron falhará para realizar algumas etapas de pré-teste.

Para executar todos os testes unitários, execute: `npm run test`. Em uma aplicação Electron os testes podem ser encontrados na pasta `spec`. Note-se que sua própria `package.json` e que suas dependências não são, portanto, definidas no `package.json`de alto nível .

Para executar apenas testes específicos que correspondam a um padrão, execute `teste de execução npm -
-g=PADRÃO`, substituindo o `PATTERN` por um regex que corresponda aos testes que você gostaria de executar. Como exemplo: Se você quiser executar apenas testes de IPC, você seria executado `npm run test -- -g ipc`.



### Testes em dispositivos Windows 10



#### Etapas extras para executar o teste da unidade:

1. O Visual Studio 2019 deve ser instalado.
2. Os cabeçalhos de nó devem ser compilados para sua configuração. 
   
   

   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```


3. O elétron.lib tem que ser copiado como nó.lib. 
   
   

   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copiar electron.lib gen\node_headers\Release\node.lib
   ```




#### Fontes faltantes

[Alguns dispositivos do Windows 10](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) não são enviados com a fonte Meiryo instalada, o que pode causar uma falha no teste de recuo da fonte. Para instalar o Meiryo:

1. Empurre a tecla Windows e procure _Gerenciar recursos opcionais_.
2. Clique em _Adicione um recurso_.
3. Selecione __ de fontes suplementares japonesas e clique em _Instalar_.



#### Medições de pixels

Alguns testes que dependem de medições precisas de pixels podem não funcionar corretamente em dispositivos com configurações de tela Hi-DPI devido a erros de precisão de ponto flutuante. Para executar esses testes corretamente, certifique-se de que o dispositivo está definido como 100% de escala.

Para configurar o dimensionamento do display:

1. Empurre a tecla Do Windows e procure _configurações de exibição_.
2. Sob _Escala e_de layout, certifique-se de que o dispositivo está definido para 100%.

[standard-addons]: https://standardjs.com/#are-there-text-editor-plugins
