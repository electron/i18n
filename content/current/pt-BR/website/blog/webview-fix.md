---
title: Correção de vulnerabilidade da Webview
author: ckerr
date: '2018-03-21'
---

Uma vulnerabilidade foi descoberta que permite a integração do Node.js novamente em alguns aplicativos do Electron que a desativam. Esta vulnerabilidade foi atribuída ao identificador CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Aplicações Afetadas

Uma aplicação é afetada se *todos os* seguintes são verdadeiros:

 1. Executa no Electron 1.7, 1.8, ou na versão 2.0.0-beta
 2. Permite a execução de código remoto arbitrário
 3. Desabilita integração do Node.js
 4. Não declara explicitamente `webviewTag: false` em suas WebPreferences
 5. Não habilita a opção `nativeWindowOption`
 6. Não intercepta eventos de `nova` janela e substitui manualmente `event.newGuest` sem usar a tag fornecida

Embora esta pareça ser uma minoria de aplicativos de Electron, encorajamos todos os pedidos a serem atualizados como medida de precaução.

## Mitigação

Essa vulnerabilidade foi corrigida na versão [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)e na versão de [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Desenvolvedores que não conseguem atualizar a versão do Electron de seu aplicativo podem mitigar a vulnerabilidade com o seguinte código:

```js
app.on('web-contents-created', (evento, ganhe) => {
  vitória. n('nova-janela', (evento, novaURL, frameName, disposição,
                        opções, adicionalCaracterísticas) => {
    se (! ptions. Opções ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opções. ebPreferences.webviewTag = false;
    deletar opções.webPreferences. recarregar;
  })
})

// e *IF* você não usa WebViews,
// você pode querer
aplicativos. n('web-contents-created', (evento, vitória) => {
  vitórias. n('will-attach-webview', (evento, webPreferations, params) => {
    event.preventDefault();
  })
})
```

## Informações Adicionais

Esta vulnerabilidade foi encontrada e reportada de forma responsável ao projeto Electron por Brendan Scarvell [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Para saber mais sobre as melhores práticas para manter seus apps Electron seguros, veja nosso [tutorial de segurança](https://electronjs.org/docs/tutorial/security).

Para relatar uma vulnerabilidade no Electron, envie um e-mail para security@electronjs.org.

Por favor, junte-se à nossa [lista de e-mail](https://groups.google.com/forum/#!forum/electronjs) para receber atualizações sobre lançamentos e atualizações de segurança.

