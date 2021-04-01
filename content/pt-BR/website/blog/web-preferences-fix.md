---
title: Correção de vulnerabilidade WebPreferences
author: ckerr
date: '2018-08-22'
---

Uma vulnerabilidade de execução de código remoto foi descoberta afetando apps com a capacidade de abrir janelas filhas aninhadas em versões do Electron (3. .0-beta.6, 2.0.7, 1.8.7 e 1.7.15). Esta vulnerabilidade foi atribuída ao identificador CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Plataformas Afetadas

Você é impactado se:

1. Você incorporou _qualquer_ conteúdo de usuário remoto, mesmo em uma sandbox
2. Você aceita a entrada do usuário com quaisquer vulnerabilidades XSS

_detalhes_

Você é impactado se qualquer código de usuário é executado dentro de um `iframe` / pode criar um `iframe`. Dada a possibilidade de uma vulnerabilidade de XSS, presume-se que a maioria dos aplicativos são vulneráveis a este caso.

Você também será impactado se abrir qualquer uma de suas janelas com `nativeWindowOpen: true` or `sandbox: true` option.  Embora esta vulnerabilidade também exija que exista uma vulnerabilidade XSS no seu aplicativo, você ainda deve aplicar uma das atenuações abaixo, se você usar qualquer uma dessas opções.

## Mitigação

Nós publicamos novas versões do Electron que incluem correções para esta vulnerabilidade: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), e [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Instamos todos os desenvolvedores do Electron a atualizarem seus aplicativos para a última versão estável imediatamente.

Se por alguma razão você não consegue atualizar sua versão do Electron, você pode proteger seu aplicativo através de eventos `de chamada em branco. reventDefault()` no evento `nova janela` para todos os  `webContents`'. Se você não usa `window.open` ou qualquer janela filha, então isso também é uma mitigação válida para o seu aplicativo.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Se você depende da capacidade das suas janelas filhas para fazer janelas netas, então uma terceira estratégia de mitigação é usar o seguinte código na sua janela de nível superior:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('nova-janela', (evento, url, frameName, disposição, opções) => {
      if (!options. {
        opções. ebPreferences = {}
      }
      objeto. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (opcions.webContents) {
        handle(options. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Este código irá manualmente forçar que as janelas de nível superior `webPreferences` sejam aplicadas manualmente a todas as janelas filhas infinitamente profundas.

## Informações Adicionais

Essa vulnerabilidade foi encontrada e reportada de forma responsável ao projeto Electron por [Matt Austin](https://twitter.com/mattaustin) of [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Para saber mais sobre as melhores práticas para manter seus apps Electron seguros, veja nosso [tutorial de segurança](https://electronjs.org/docs/tutorial/security).

Se você deseja relatar uma vulnerabilidade no Electron, envie e-mail security@electronjs.org.
