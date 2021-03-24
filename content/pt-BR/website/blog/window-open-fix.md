---
title: Reparo de Vulnerabilidade BrowserView window.open()
author: ckerr
date: '2019-02-03'
---

Uma vulnerabilidade de código foi descoberta que permite que o Node seja reativado em janelas filhas.

---

Abrir uma BrowserView com `sandbox: true` or `nativeWindowOpen: true` and `nodeIntegration: false` result in a webContents where `window. caneta` pode ser chamada e a nova janela filho aberta terá o nó `` habilitado. Esta vulnerabilidade afeta todas as versões suportadas do Electron.

## Mitigação

We've published new versions of Electron which include fixes for  this vulnerability: [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4), and [`5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Nós encorajamos todos os desenvolvedores do Electron a atualizarem seus aplicativos para a última versão estável imediatamente.

Se por alguma razão você não conseguir atualizar sua versão do Electron, você pode mitigar esse problema desabilitando todos os conteúdos da web filho:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Informações Adicionais

Essa vulnerabilidade foi encontrada e reportada de forma responsável ao projeto Electron por [PalmerAL](https://github.com/PalmerAL).

Para saber mais sobre as melhores práticas para manter seus apps Electron seguros, veja nosso [tutorial de segurança](https://electronjs.org/docs/tutorial/security).

Se você deseja relatar uma vulnerabilidade no Electron, envie e-mail security@electronjs.org.
