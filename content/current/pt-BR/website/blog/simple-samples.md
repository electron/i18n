---
title: Amostras Simples do Electron
author: zeke
date: '2017-01-19'
---

Recentemente, hospedamos uma hackathon do Electron no GitHub HQ para membros da [Hackbright Academy](https://hackbrightacademy.com), uma escola de programação para mulheres fundada em São Francisco. Para ajudar os participantes a começarem de frente em seus projetos, nossas próprias [Kevin Sawicki](https://github.com/kevinsawicki) criaram algumas aplicações do Electron.

---

Se você é novo no desenvolvimento do Electron ou ainda não o experimentou, esses aplicativos de exemplo são um ótimo lugar para começar. Eles são pequenos, fáceis de ler, e o código está fortemente comentado para explicar como tudo funciona.

Para começar, clone este repositório:

```sh
git clone https://github.com/electron/simple-samples
```

Para executar qualquer um dos aplicativos abaixo, mude para o diretório do aplicativo, instale as dependências e então inicie:

```sh
cd activity-monitor
npm install
npm start
```

## Monitor de Atividades

Mostra um gráfico de massa do sistema da CPU, o usuário e o tempo de atividade ociosa.

[![Pré-visualizar](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hash

Mostra os valores de hash do texto digitado usando algoritmos diferentes.

[![screenshot](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Mirror (espelhamento)

Reproduz um vídeo da câmera do computador no tamanho máximo, como olhar para um espelho. Inclui um efeito opcional de filtro de arco-íris que usa animações CSS.

## Preços

Mostra o preço atual do petróleo, ouro e prata usando a API de finanças do Yahoo.

[![screenshot](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Carrega uma URL passada na linha de comando em uma janela.

## Outros recursos

Esperamos que esses aplicativos ajudem você a começar a usar o Electron. Aqui estão alguns outros recursos para aprender mais:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Uma aplicação mínima do Electron boilerplate.
- [Repositório de API do Electron](https://github.com/electron/electron-api-demos): Um aplicativo interativo que demonstra os principais recursos da API do Electron
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Toda documentação do Electron juntos em uma única página pesquisável.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Outra coleção de aplicações amostrais para a Electron, compilada pelo mantenedor da Electron [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - Um repositório GitHub que coleta os melhores e mais recentes tutoriais, livros, vídeos, etc.