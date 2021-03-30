---
title: Ferramentas de Acessibilidade
author: lorde
date: '2016-08-23'
---

Fazer aplicativos acessíveis é importante e ficamos felizes em apresentar novas funcionalidades ao [Devtron](https://electronjs.org/devtron) e [Spectron](https://electronjs.org/spectron) que dão aos desenvolvedores a oportunidade de tornar seus aplicativos melhores para todos.

---

Preocupações de acessibilidade no Electron são semelhantes às dos sites porque ambos são, no final, HTML. Com apps Electron, no entanto, você não pode usar os recursos on-line para auditorias de acessibilidade porque o seu aplicativo não tem uma URL para apontar o auditor.

These new features bring those auditing tools to your Electron app. Você pode optar por adicionar auditorias aos seus testes com a Spectron ou usá-las dentro da DevTools com a Devtron. Leia para um resumo das ferramentas ou verifique nossa [documentação de acessibilidade](https://electronjs.org/docs/tutorial/accessibility/) para obter mais informações.

### Spectron

No esquema de testes Spectron, agora é possível auditoria em cada janela e `<webview>` em sua aplicação. Como por exemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Você pode ler mais sobre esse recurso na [documentação do Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

No Devtron há uma nova guia de acessibilidade que permitirá que você audite uma página em seu aplicativo, classifique e filtre os resultados.

![captura de tela do devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas as ferramentas estão usando a biblioteca [do desenvolvedor de acessibilidade](https://github.com/GoogleChrome/accessibility-developer-tools) criada pelo Google para Chrome. Você pode saber mais sobre as regras de auditoria de acessibilidade que esta biblioteca usa no [wiki daquele repositório](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Se você conhece outras ótimas ferramentas de acessibilidade para o Electron, adicione-as à [documentação de acessibilidade](https://electronjs.org/docs/tutorial/accessibility/) com um pull request.

