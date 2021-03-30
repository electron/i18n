---
title: Protokoll-Handler-Schwachstelle Fix
author: zeke
date: '2018-01-22'
---

Eine Verwundbarkeit für entfernte Codeausführung wurde entdeckt, die Electron-Apps betrifft, die benutzerdefinierte Protokoll-Handler verwenden. This vulnerability has been assigned the CVE identifier [CVE-2018-1000006][].

---

## Betroffene Plattformen

Electron-Apps, die unter Windows laufen sollen, die sich als Standard- -Handler für ein Protokoll registrieren, wie `myapp://`, sind verwundbar.

Such apps can be affected regardless of how the protocol is registered, e.g. using native code, the Windows registry, or Electron's [app.setAsDefaultProtocolClient][] API.

macOS and Linux are **not vulnerable** to this issue.

## Abmilderung

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für für diese Verwundbarkeit enthalten: [`1.8.2-Beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), und [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Wir fordern alle Electron-Entwickler dringend auf, ihre Apps auf die neueste stabile Version zu aktualisieren.

If for some reason you are unable to upgrade your Electron version, you can append `--` as the last argument when calling [app.setAsDefaultProtocolClient][], which prevents Chromium from parsing further options. Der doppelte Strich `--` bedeutet das Ende der Befehlsoptionen, danach werden nur Positionsparameter akzeptiert.

```js
app.setAsDefaultProtocolClient(Protokoll, process.execPath, [
  '--your-switches-here',
  '--'
])
```

See the [app.setAsDefaultProtocolClient][] API for more details.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Wenn Sie eine Verwundbarkeit in Electron melden möchten, senden Sie eine E-Mail an security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[CVE-2018-1000006]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006
