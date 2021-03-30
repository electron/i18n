---
title: Protokoll-Handler-Schwachstelle Fix
author: zeke
date: '2018-01-22'
---

Eine Verwundbarkeit für entfernte Codeausführung wurde entdeckt, die Electron-Apps betrifft, die benutzerdefinierte Protokoll-Handler verwenden. Diese Verwundbarkeit wurde der CVE-Identifikator [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006) zugewiesen.

---

## Betroffene Plattformen

Electron-Apps, die unter Windows laufen sollen, die sich als Standard- -Handler für ein Protokoll registrieren, wie `myapp://`, sind verwundbar.

Solche Apps können unabhängig davon, wie das Protokoll registriert ist, beeinflusst werden, z. unter Verwendung des nativen Codes, der Windows Registry oder der Electronic [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS and Linux are **not vulnerable** to this issue.

## Abmilderung

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für für diese Verwundbarkeit enthalten: [`1.8.2-Beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), und [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Wir fordern alle Electron-Entwickler dringend auf, ihre Apps auf die neueste stabile Version zu aktualisieren.

Wenn Sie aus irgendeinem Grund nicht in der Lage sind, Ihre Electron-Version zu aktualisieren Sie können `--` als letztes Argument anhängen, wenn Sie [App aufrufen. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), , der Chromium daran hindert, weitere Optionen zu parsen. Der doppelte Strich `--` bedeutet das Ende der Befehlsoptionen, danach werden nur Positionsparameter akzeptiert.

```js
app.setAsDefaultProtocolClient(Protokoll, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Siehe [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) für weitere Details.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial](https://electronjs.org/docs/tutorial/security).

Wenn Sie eine Verwundbarkeit in Electron melden möchten, senden Sie eine E-Mail an security@electronjs.org.
