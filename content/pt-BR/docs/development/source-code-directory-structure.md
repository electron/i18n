# Estrutura de Diretório do Código Fonte

O código fonte de Elétron é separado em algumas partes, principalmente após o Cromo nas convenções de separação.

Você pode precisar se familiarizar com [arquitetura de multiprocesso do Chromium](https://dev.chromium.org/developers/design-documents/multi-process-architecture) entender melhor o código-fonte.

## Estrutura do Código Fonte

```diff
Electron
"Compilação".
♦➤➤ buildflags/ - Determina o conjunto de características que podem ser construídas condicionalmente.
(➤➤➤ chromium_src/ - Código fonte copiado do Chromium que não faz parte da camada de conteúdo.
default_app Um aplicativo padrão é executado quando o Electron é iniciado sem
|                  fornecendo um aplicativo de consumo.
Documentos da Eletrônica.
|   ♦➤➤ api/ - Documentação para módulos e APIs externamente voltados para a Eletrônica.
|   (➤➤➤ desenvolvimento/ - Documentação para auxiliar no desenvolvimento e com a Eletrônica.
|   "➤➤ violinos/ - Um conjunto de trechos de código que se pode executar em Electron Fiddle.
|   Imagens/- Imagens usadas na documentação.
|   └ tutorial/- Documentos tutoriais para vários aspectos da Eletrônica.
➤➤➤ lib/ - Código-fonte JavaScript/TypeScript.
|   ➤➤➤ navegador/ - Código de inicialização do processo principal.
|   |   ♦➤➤ api/ - Implementação de API para os principais módulos de processo.
|   |   └sedor/- Código relacionado ao módulo remoto como é
|   |                 usado no processo principal.
|   ➤➤➤ comum/ - Relacionado à lógica necessária tanto pelos processos principais quanto pelos renderizantes.
|   |   └ api/- Implementação de API para módulos que podem ser usados em
|   |              tanto os principais quanto os processos de renderização
|   ―➤➤ isolated_renderer/ - Lida com a criação de processos isolados de renderização quando
|   |                        contextisolação está habilitada.
|   ♦➤➤ renderização/ - Código de inicialização do processo renderizador.
|   |   ♦➤➤ implementação de API para módulos de processo de renderização.
|   |   Extensão /-Código relacionado ao uso de extensões do Chrome
|   |   |                no processo renderizador de Elétron.
|   |   ➤➤➤ remoto/ - Lógica que lida com o uso do módulo remoto em
|   |   |             o processo principal.
|   |   └➤➤ web-view/ - Lógica que lida com o uso de webviews no
|   |                   processo de renderização.
|   ➤➤➤ sandboxed_renderer/ - Lógica que lida com a criação de renderizador de caixa de areia
|   |   |                     Processos.
|   |   └sa api/- Implementação de API para processos de renderização com caixa de areia.
|   └seperceiro/- Lógica que lida com a funcionalidade adequada do Nó.js
|                 ambientes em Web Workers.
Patches aplicados em cima das dependências do núcleo da Electron
|   |          a fim de lidar com as diferenças entre nossos casos de uso e
|   |          funcionalidade padrão.
|   ―➤➤ boringssl/ - Patches aplicados ao garfo do Google de OpenSSL, BoringSSL.
|   ♦➤➤ cromo/ - Manchas aplicadas ao Cromo.
|   (-)➤➤ nó/ - Patches aplicados em cima de Node.js.
|   └sagradão v8/ - Patches aplicados em cima do motor V8 do Google.
♦➤➤ shell/ - Código-fonte C++.
|   ♦➤➤ aplicativo/ - Código de entrada do sistema.
|   O frontend inclui a janela principal, a interface do usuário e toda a
|   |   |          principais coisas do processo. Isso conversa com o renderizador para gerenciar a web
|   |   |          Páginas.
|   |   ♦➤➤ ui/ - Implementação de material de interface do usuário para diferentes plataformas.
|   |   |   ➤➤➤ cacau/ - Código fonte específico do cacau.
|   |   |   ➤➤➤ win/ - Código-fonte específico do Windows GUI.
|   |   |   └➤➤ x/ - Código fonte específico X11.
|   |   A implementação das PRINCIPAIs APIs do processo.
|   |   ➤➤➤ net/ - Código relacionado à rede.
|   |   ➤➤➤ mac/ - Código-fonte Objetivo-C específico do Mac.
|   |   └sacons%de recursos/- Ícones, arquivos dependentes de plataforma, etc.
|   ➤➤➤ renderer/ - Código que é executado em processo de renderização.
|   |   └sa api/- A implementação de APIs de processo renderizador.
|   └sagradão comum/ - Código que é usado pelos principais e renderizadoras,
|       |         incluindo algumas funções de utilidade e código para integrar
| do nó       |         loop de mensagem no loop de mensagem do Chromium.
|       └ api/- A implementação de APIs comuns e fundamentos de
|                  Módulos embutidos da Electron.
Especificações /-- Componentes do conjunto de testes da Electron são executados no processo de renderização.
―➤➤ spec-main/ - Componentes do conjunto de testes da Electron são executados no processo principal.
└─➤ BUILD.gn - Regras de construção de Elétrons.
```

## Estrutura de Outros Diretórios

* **arquivo .circleci** - Config para CI com CircleCI.
* **.github** - Arquivos de config específicos do GitHub, incluindo modelos de problemas e CODEOWNERS.
* **dist** - Diretório temporário criado por `script/create-dist.py` script ao criar uma distribuição.
* **external_binaries** - Binários baixados de frameworks de terceiros que não suportam construção com `gn`.
* **node_modules** - Módulos de nó de terceiros utilizados para construção.
* **npm** - Lógica para instalação de Electron via npm.
* **** - Diretório de produção temporária de `ninja`.
* **** de scripts - Scripts usados para fins de desenvolvimento como construção, embalagem, testes de , etc.

```diff
script/ - O conjunto de todos os scripts Electron é executado para uma variedade de propósitos.
♦➤➤ codesign/ - Falsifica codinome para aplicativos Electron; usado para testes.
―➤➤ lib/ - Scripts diversos de utilidade python.
└a versão➤➤ / - Scripts são executados durante o processo de lançamento da Electron.
    Notas de "➤➤➤ - Gera notas de lançamento para novas versões Electron.
    └sedores de uploaders/- Carrega vários arquivos relacionados à versão durante a liberação.
```

* **ferramentas** - Scripts de ajuda usados por arquivos GN.
  * Os scripts aqui colocados nunca devem ser invocados diretamente pelos usuários, ao contrário dos `script`.
* **digitações** - Digitação typeScript para o código interno da Electron.
* **fornecedor** - Código fonte para algumas dependências de terceiros.
