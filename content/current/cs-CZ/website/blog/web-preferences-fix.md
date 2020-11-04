---
title: Oprava zranitelnosti WebPreferences
author: ckerr
date: '2018-08-22'
---

Byla nalezena zranitelnost vykonání vzdáleného kódu ovlivňující aplikace se schopností otevřít vnořená dětská okna v Electronových verzích (3. .0-beta.6, 2.0.7, 1.8.7 a 1.7.15). Tato zranitelnost byla přiřazena identifikátor CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Postižené platformy

Máte dopad, jestliže:

1. Vložili jste _jakýkoli_ obsah vzdáleného uživatele, a to i v sandboxu
2. Přijímáte vstup uživatele s jakými XSS zranitelnými místy

_Detaily_

Jste ovlivněni, pokud nějaký uživatelský kód běží uvnitř `iframe` / může vytvořit `iframe`. Vzhledem k možnosti zranitelnosti XSS lze předpokládat, že většina aplikací je v tomto případě zranitelná.

Máte také dopad, pokud otevřete některé ze svých oken s `nativeWindowOpen: true` nebo `sandbox: true`.  I když tato zranitelnost vyžaduje také XSS zranitelnost ve vaší aplikaci, Pokud použijete některou z těchto možností, měli byste přesto uplatnit jedno ze zmírňujících opatření níže.

## Zmírnění

Zveřejnili jsme nové verze Electronu, které obsahují opravy pro tuto zranitelnost: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)a [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Vyzýváme všechny vývojáře Electronu, aby okamžitě aktualizovali své aplikace na nejnovější stabilní verzi.

Pokud z nějakého důvodu nemůžete aktualizovat svou verzi Electronu, můžete svou aplikaci chránit voláním přes blanket. `událostí. reventDefault()` na události `nového okna` pro všechny  `webObsah`'. Pokud vůbec nepoužíváte `okno.otevřít` nebo žádná podružná okna, je to také platné rušení pro vaši aplikaci.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Pokud se spoléháte na schopnost svých dětských oken vytvářet vnukká okna, pak třetí strategií zmírňování rušení je použít následující kód v horním okně vašeho okna:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContent. n('new-window', (event url, frameName, disposition, options) => {
      if (!options. ebPreferences) {
        možnosti. ebPreference = {}
      }
      objekt. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Tento kód ručně vynucuje, aby byla nejlepší okna `webPreferences` manuálně aplikována na všechna dětská okna nekonečně hluboká.

## Další informace

Tato zranitelnost byla zjištěna a odpovědně hlášena projektu Electron od [Matt Austin](https://twitter.com/mattaustin) od [Kontrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Pokud chcete nahlásit zranitelnost v Electronu, napište email security@electronjs.org.
