# Izolace kontextů

## Co to je?

Kontextová izolace je funkce, která zajišťuje, že jak vaše `přednačítání` skriptů, tak vnitřní logika Electronu běží v samostatném kontextu na webovou stránku, kterou načítáte v [`webContents`](../api/web-contents.md).  To je důležité z bezpečnostních důvodů, protože to pomáhá zabránit přístupu k Electron interálům nebo k výkonným API má přístup váš preload skript.

To znamená, že objekt `okno` , ke kterému má váš přednažený skript přístup, je **jiný** objekt než webová stránka by k němu měla přístup.  Například, pokud nastavíte `window.hello = 'wave'` ve vašem preload skriptu a kontextová izolace je povolena `okno. ello` nebude definováno, pokud se k němu webová stránka pokouší přistupovat.

Každá jednotlivá aplikace by měla mít povolenou izolaci kontextu, a z Electronu 12 bude ve výchozím nastavení povolena.

## Jak to mohu povolit?

Od Electronu 12 bude ve výchozím nastavení povoleno. Pro nižší verze je to možnost v `webPreferences` při vytváření `nového BrowserWindow`'s.

```javascript
const mainWindow = nový BrowserWindow({
  webPreference: {
    contextIsolation: true
  }
})
```

## Migrace

> Použil jsem k poskytnutí API z mého přednaženého skriptu pomocí `window.X = apiObject` , co právě teď?

Vystavení API z vašeho preload skriptu na načtenou webovou stránku je běžným využitím a v Electronu je vyhrazený modul, který vám pomůže bezbolestným způsobem to udělat.

**Pozoru: S vypnutou izolací kontextů**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Poté je povolena izolace kontextů**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Modul [`contextBridge`](../api/context-bridge.md) lze použít pro **bezpečně** vystavit API z izolovaného kontextu, který běží v kontextu, v němž je webová stránka spuštěna. API bude také přístupné z webu na `window.myAPI` stejně jako dříve.

Měli byste si přečíst dokumentaci `contextBridge` propojenou výše, abyste plně pochopili její omezení.  Například nemůžete posílat vlastní prototypy nebo symboly přes most.

## Bezpečnostní úvahy

Pouhé povolení `contextIsolation` a používání `contextBridge` automaticky neznamená, že vše, co děláte, je v bezpečí.  Například tento kód je **nebezpečný**.

```javascript
// ❌ Špatný kód
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Přímo vystavuje mocné API bez jakéhokoli způsobu filtrování argumentů. Umožnilo by to všem webovým stránkám odesílat libovolné IPC zprávy, které nechcete být možné. Správným způsobem, jak odhalit API založené na IPC, by místo toho bylo poskytnout jednu metodu pro zprávu IPC.

```javascript
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

