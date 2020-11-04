---
title: Novidades no Electron
author: lorde
date: '2015-10-15'
---

Houve algumas atualizações e conversações interessantes sobre o Electron recentemente, aqui está uma rodada.

---

## fonte

O Electron agora está atualizado com o Chrome 45 a partir da `v0.32.0`. Outras atualizações incluem...

### Melhor Documentação

![novos documentos](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Reestruturámos e normalizámos a documentação para melhor e melhor lermos. Também há traduções da documentação que contribuem para a comunidade, como japonês e coreano.

Pull requests relacionados: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Desde a `v0.33.0` o Electron é fornecido com Node.js 4.1.0.

pull request relacionado: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### node-pre-gyp

Módulos que dependem do `node-pre-gyp` agora podem ser compilados contra o Electron ao construir a partir da fonte.

pull request relacionado: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Suporte ARM

O Electron agora fornece compilações para Linux no ARMv7. Ele é executado em plataformas populares como Chromebook e Raspberry Pi 2.

Problemas relacionados: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Janela sem Frame estilo de Yosemit

![Janela sem quadro](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Foi mesclado um patch de [@jaanus](https://github.com/jaanus) que, como os outros aplicativos integrados do OS X, permite criar janelas sem frames com os semáforos do sistema integrados no OS X Yosemite e posteriormente.

pull request relacionado: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Suporte à Impressão do Google Summer of Code

Após o Verão do Google do Código, fizemos merge de patches por [@hokein](https://github.com/hokein) para melhorar o suporte a impressão. e adicione a possibilidade de imprimir a página em arquivos PDF.

Problemas relacionados: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom agora é atualizado para Electron `v0.30.6` rodando Chrome 44. Uma atualização para `v0.33.0` está em andamento no [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Conversas

O GitHubber [Amy Palamountain](https://github.com/ammeep) fez uma excelente introdução ao Electron em uma conversa em [Nordic.js](https://nordicjs2015.confetti.events). Ela também criou a biblioteca</a> electron-accelerator de.</p> 



#### Construindo aplicações nativas com Electron por Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ogle](https://github.com/benogle)Ben, também na equipe Atom , falou com Electron na [Ásia YAPC](http://yapcasia.org/2015/):



#### Construindo Aplicativos de Desktop com Tecnologias Web por Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

O membro da Atom [Kevin Sawicki](https://github.com/kevinsawicki) e outros deram palestras no Electron na [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) encontro recentemente. Os [vídeos](http://www.wagonhq.com/blog/electron-meetup) foram postados, aqui está um casal:



#### A História do Electron por Kevin Sawicki

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Fazer com que um aplicativo da web se sinta nativo por Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

