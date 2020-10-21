---
title: Oprava zranitelnosti obsluhy protokolu
author: zeke
date: '2018-01-22'
---

Byla nalezena zranitelnost vykonávání vzdáleného kódu ovlivňující aplikace Electronu, které používají vlastní zpracovače protokolu. Tato zranitelnost byla přiřazena identifikátor CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Postižené platformy

Electron aplikace navržené pro spuštění na Windows, které se registrují jako výchozí obsluha protokolu, jako `myapp://`, jsou zranitelné.

Tyto aplikace mohou být ovlivněny bez ohledu na to, jak je protokol registrován, např. pomocí nativního kódu, registru Windows nebo Electronu [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS a Linux nejsou vůči tomuto problému **náchylné**.

## Zmírnění

Zveřejnili jsme nové verze Electronu, které obsahují opravy pro tuto zranitelnost: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), a [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Vyzýváme všechny vývojáře Electronu, aby okamžitě aktualizovali své aplikace na nejnovější stabilní verzi.

Pokud z nějakého důvodu nemůžete aktualizovat svou verzi Electronu, můžete připojit `--` jako poslední argument při volání [aplikace. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), , což Chromiu brání analyzovat další možnosti. Dvojité pomlčky `--` označují konec nastavení příkazu, poté jsou akceptovány pouze polohové parametry.

```js
app.setAsDefaultProtocolClient(protokol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Více informací naleznete v [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Pokud chcete nahlásit zranitelnost v Electronu, napište e-mail security@electronjs.org.
