---
title: Correção de vulnerabilidade do protocolo manipulador
author: zeke
date: '2018-01-22'
---

Foi descoberta uma vulnerabilidade de execução de código remoto que afeta Electron apps que usam manipuladores de protocolo personalizados. Essa vulnerabilidade foi atribuída o identificador CVE [CVE-2018-1000006][].

---

## Plataformas Afetadas

Aplicativos Electron projetados para serem executados no Windows que se registram como o manipulador padrão de um protocolo, como `myapp://`, são vulneráveis.

Esses aplicativos podem ser afetados independentemente de como o protocolo é registrado, por exemplo, usando código nativo, o registro do Windows ou o aplicativo [da Electron.setAsDefaultProtocolClient][] API.

O macOS e o Linux são **não são** vulneráveis a este problema.

## Mitigação

Nós publicamos novas versões do Electron que incluem correções para essa vulnerabilidade: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1,7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), e [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Instamos todos os desenvolvedores do Electron a atualizarem seus aplicativos para a última versão estável imediatamente.

Se, por algum motivo, você não conseguir atualizar sua versão Electron, você pode anexar `--` como o último argumento ao ligar para [app.setAsDefaultProtocolClient][], que impede o Chromium de analisar outras opções. O traço duplo `--` significa o fim das opções de comando, após o qual apenas parâmetros posicionais são aceitos.

```js
app.setAsDefaultProtocolClient(protocolo, processo.execPath, [
  '--your-switches-here',
  '--'
])
```

Consulte o [app.setAsDefaultProtocolClient][] API para obter mais detalhes.

Para saber mais sobre as melhores práticas para manter seus aplicativos Electron seguros, veja nosso tutorial de segurança [][].

Se você deseja relatar uma vulnerabilidade no Electron, envie um e-mail para security@electronjs.org.

[4]: https://electronjs.org/docs/tutorial/security

[5]: https://electronjs.org/docs/tutorial/security
[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[da Electron.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[CVE-2018-1000006]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006
