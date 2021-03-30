---
title: Correção de vulnerabilidade do protocolo manipulador
author: zeke
date: '2018-01-22'
---

Foi descoberta uma vulnerabilidade de execução de código remoto que afeta Electron apps que usam manipuladores de protocolo personalizados. This vulnerability has been assigned the CVE identifier [CVE-2018-1000006][].

---

## Plataformas Afetadas

Aplicativos Electron projetados para serem executados no Windows que se registram como o manipulador padrão de um protocolo, como `myapp://`, são vulneráveis.

Such apps can be affected regardless of how the protocol is registered, e.g. using native code, the Windows registry, or Electron's [app.setAsDefaultProtocolClient][] API.

O macOS e o Linux são **não são** vulneráveis a este problema.

## Mitigação

Nós publicamos novas versões do Electron que incluem correções para essa vulnerabilidade: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1,7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), e [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Instamos todos os desenvolvedores do Electron a atualizarem seus aplicativos para a última versão estável imediatamente.

If for some reason you are unable to upgrade your Electron version, you can append `--` as the last argument when calling [app.setAsDefaultProtocolClient][], which prevents Chromium from parsing further options. O traço duplo `--` significa o fim das opções de comando, após o qual apenas parâmetros posicionais são aceitos.

```js
app.setAsDefaultProtocolClient(protocolo, processo.execPath, [
  '--your-switches-here',
  '--'
])
```

See the [app.setAsDefaultProtocolClient][] API for more details.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Se você deseja relatar uma vulnerabilidade no Electron, envie um e-mail para security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[CVE-2018-1000006]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006
