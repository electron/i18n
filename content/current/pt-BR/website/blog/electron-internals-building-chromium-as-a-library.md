---
title: 'Interior do Electron: Construindo Chromium como uma biblioteca'
author: zcbenz
date: '2017-03-03'
---

O Electron é baseado no Chromium, de código aberto do Google, um projeto que não é necessariamente projetado para ser usado por outros projetos. Este post introduz como o Chromium é construído como uma biblioteca para uso do Electron, e como o sistema de compilação tem evoluído ao longo dos anos.

---

## Usando o CEF

O Chromium Embedded Framework (CEF) é um projeto que transforma Chromium em uma biblioteca e fornece APIs estáveis baseadas na base de código do Chromium. Muito versões iniciais do editor Atom e NW.js usavam o CEF.

Para manter uma API estável, o CEF oculta todos os detalhes do Chromium e encapsula as APIs do Chromium com sua própria interface. Então, quando precisávamos acessar APIs Chromium subjacentes, como integrar Node.js em páginas web, as vantagens do CEF se tornaram bloqueadores.

Então, no final, ambos o Electron e NW.js mudaram diretamente para usar as APIs do Chromium .

## Construção como parte do Chromium

Mesmo que o Chromium não suporte oficialmente projectos externos, a base de código é modular e é fácil construir um navegador mínimo com base no Chromium. O módulo central fornecendo a interface do navegador é chamado de Módulo de Conteúdo.

Para desenvolver um projeto com Módulo de Conteúdo, a maneira mais fácil é construir o projeto como parte do Chromium. Isso pode ser feito primeiro verificando o código-fonte do Chrome e, em seguida, adicionando o arquivo `DEPS` do Chromium.

NW.js e versões muito antigas do Electron estão usando esta forma de construção.

O lado negativo é, o Chromium é um código muito grande e requer máquinas muito poderosas para serem construídas. Para computadores portáteis normais, isso pode demorar mais de 5 horas. Então isso afeta muito o número de desenvolvedores que podem contribuir com o projeto e também torna o desenvolvimento mais lento.

## Criando Chromium como uma única biblioteca compartilhada

Como usuário do Módulo de Conteúdo, o Electron não precisa modificar o código do Chromium na maioria dos casos, então uma maneira óbvia de melhorar o edifício do Electron é construir o Chromium como uma biblioteca compartilhada, e, em seguida, vincule com ele no Electron. Desta forma os desenvolvedores não precisam mais construir todo o Chromium quando contribuem para Electron.

O projeto [libcromiumcontent][] foi criado por [@aroben](https://github.com/aroben) para este fim. Ele constrói o Módulo de Conteúdo do Chromium como uma biblioteca compartilhada, e fornece cabeçalhos do Chromium e binários pré-construídos para download. O código da versão inicial do libcromiumcontent pode ser encontrado [neste link][libcc-classic].

O projeto [brightray][] também nasceu como parte do conteúdo libcromium, que fornece uma camada fina em torno do Módulo de Conteúdo.

Ao usar libchromiumcontent e brilhantes juntos, desenvolvedores podem construir um navegador rapidamente sem entrar nos detalhes do desenvolvimento do Chromium. E remove as exigências de uma rede rápida e uma máquina poderosa para construir o projeto.

Além da Electron, havia também outros projetos baseados em Cromo construídos desta maneira , como o navegador [Breach][breach].

## Filtrando os símbolos exportados

No Windows há uma limitação de quantos símbolos uma biblioteca compartilhada pode exportar. À medida que a base de código do Chromium cresceu, o número de símbolos exportados no libchromiumcontent rapidamente excedeu a limitação.

A solução era filtrar os símbolos desnecessários ao gerar o arquivo DLL. Ele funcionou [fornecendo um arquivo `.def` para o linker][libcc-def], e, em seguida, usando um script para [julgar se os símbolos sob um namespace devem ser exportados][libcc-filter].

Ao adoptar esta abordagem, embora o Chromium continue adicionando novos símbolos exportados, libchromiumcontent ainda poderia gerar arquivos de biblioteca compartilhada ao remover mais símbolos.

## Compilação de componentes

Antes de falar sobre as próximas etapas tomadas no libchromiumcontent, é importante introduzir o conceito de compilação de componentes no Chromium primeiro.

Enquanto grande projecto, o passo de interligação demora muito tempo no caso do Chromium ao construir. Normalmente quando um desenvolvedor faz uma pequena alteração, pode levar 10 minutos para ver a saída final . Para resolver isso, compilação de componente introduzido pelo Chromium, que compila cada módulo em Chromium como bibliotecas compartilhadas separadas, então o tempo gasto na etapa final de vinculação torna-se despercebido.

## Binários brutos de transporte

Com o Chromium continuando a crescer, havia tantos símbolos exportados em Chromium que até mesmo os símbolos do Módulo de Conteúdo e do Webkit eram maiores do que a limitação. Foi impossível gerar uma biblioteca compartilhada utilizável simplesmente tirando símbolos.

No final, tivemos que [enviar os binários crus do Chromium][libcc-gyp] em vez de gerando uma única biblioteca compartilhada.

Como introduzido anteriormente, existem dois modos de compilação no Chromium. Como resultado da entrega de binários crus, temos que entregar duas distribuições diferentes de binários no libchromiumcontent. Um é chamado de compilação `static_library` , que inclui todas as bibliotecas estáticas de cada módulo gerado pela compilação normal do Chromium. A outra é `shared_library`, que inclui todas as bibliotecas compartilhadas de cada módulo gerado pela compilação do componente.

No Electron, a versão de Debug está conectada com a versão `shared_library` da libchromiumcontent, porque é pequeno para baixar e leva pouco tempo quando vincular o executável final. E a versão de lançamento do Electron é ligada à `static_library` versão de libchromiumcontent, para que o compilador gere símbolos completos que são importantes para depuração, e o linker pode fazer muito melhor otimização, pois ele sabe quais arquivos de objeto são necessários e quais não são.

Então para o desenvolvimento normal, os desenvolvedores só precisam construir a versão de depuração, que não requer uma boa rede ou uma máquina poderosa. Embora a versão de lançamento em seguida precise de muito melhor hardware para construir, ela pode gerar melhores binários.

## A atualização `gn`

Sendo um dos maiores projetos do mundo, os sistemas mais normais não são adequados para construir o Chromium, e a equipe do Chromium desenvolve suas próprias ferramentas de compilação .

Versões anteriores do Chromium estavam usando `gyp` como um sistema de construção, mas ele sofre de lentidão, e seu arquivo de configuração se torna difícil de entender para projetos complexos . Após anos de desenvolvimento, o Chromium mudou para `gn` como um sistema de compilação, que é muito mais rápido e tem uma arquitetura clara.

Uma das melhorias do `gn` é introduzir `source_set`, que representa um grupo de arquivos de objeto. Em `gyp`, cada módulo foi representado por `static_library` ou `shared_library`, e para a compilação normal do Chromium, cada módulo gerou uma biblioteca estática e eles foram ligados juntos no executável final. Usando `gn`, cada módulo agora gera apenas um monte de arquivos de objeto e o executável final apenas vincula todos os arquivos de objeto juntos, então os arquivos da biblioteca estática intermediária não serão mais gerados.

Essa melhoria, no entanto, causou grandes problemas à libchromiumcontent, porque os arquivos da biblioteca estática intermediária eram realmente necessários para a libchromiumcontent.

A primeira tentativa de resolver isso foi [ `gn` de patch para gerar biblioteca estática arquivos][libcc-gn-hack], o que resolveu o problema, mas estava longe de ser uma solução decente.

A segunda tentativa foi feita por [@alespergl](https://github.com/alespergl) para [produzir bibliotecas estáticas personalizadas a partir da lista de arquivos de objetos][libcc-gn]. Ele usou um truque para executar primeiro uma compilação fictícia para coletar uma lista de arquivos de objeto gerados , e, em seguida, construir as bibliotecas estáticas alimentando `gn` com a lista. Ela só fez alterações mínimas no código-fonte do Chromium, e manteve a arquitetura de construção do Electron ainda ativa.

## Sumário

Como você pode ver, em comparação com construir o Electron como parte do Chromium, construindo Chromium como biblioteca leva mais esforços e requer manutenção contínua. No entanto, este último remove a exigência de hardware poderoso para construir o Electron, Habilitando uma gama muito maior de desenvolvedores para construir e contribuir com Electron. O esforço vale absolutamente a pena.

[libcromiumcontent]: https://github.com/electron/libchromiumcontent
[brightray]: https://github.com/electron/brightray
[breach]: https://www.quora.com/Is-Breach-Browser-still-in-development
[libcc-classic]: https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c
[libcc-def]: https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b
[libcc-filter]: https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd
[libcc-gyp]: https://github.com/electron/libchromiumcontent/pull/98
[libcc-gn-hack]: https://github.com/electron/libchromiumcontent/pull/239
[libcc-gn]: https://github.com/electron/libchromiumcontent/pull/249

