---
title: Correção de vulnerabilidade do protocolo manipulador
author: zeke
date: '2018-01-22'
---

Foi descoberta uma vulnerabilidade de execução de código remoto que afeta Electron apps que usam manipuladores de protocolo personalizados. Esta vulnerabilidade foi atribuída ao identificador CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Plataformas Afetadas

Aplicativos Electron projetados para serem executados no Windows que se registram como o manipulador padrão de um protocolo, como `myapp://`, são vulneráveis.

Tais aplicativos podem ser afetados independentemente de como o protocolo é registrado, por exemplo, usando código nativo, o registro do Windows, ou a API [do Electron.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows).

O macOS e o Linux são **não são** vulneráveis a este problema.

## Mitigação

Nós publicamos novas versões do Electron que incluem correções para essa vulnerabilidade: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1,7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), e [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Instamos todos os desenvolvedores do Electron a atualizarem seus aplicativos para a última versão estável imediatamente.

Se por algum motivo, você não pode atualizar sua versão do Electron, você pode acrescentar `--` como o último argumento ao ligar para [um aplicativo. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), que impede o Chromium de analisar outras opções. O traço duplo `--` significa o fim das opções de comando, após o qual apenas parâmetros posicionais são aceitos.

```js
app.setAsDefaultProtocolClient(protocolo, processo.execPath, [
  '--your-switches-here',
  '--'
])
```

Veja o [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API para mais detalhes.

Para saber mais sobre as melhores práticas para manter seus apps Electron seguros, veja nosso [tutorial de segurança](https://electronjs.org/docs/tutorial/security).

Se você deseja relatar uma vulnerabilidade no Electron, envie um e-mail para security@electronjs.org.
